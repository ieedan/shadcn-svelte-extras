import { getReference } from '$lib/docs/api-reference/components';
import { referenceBundleToMarkdown } from '$lib/docs/api-reference/reference-to-markdown';
import { resolveCommand } from 'package-manager-detector/commands';

const DOC_SITE_ORIGIN = 'https://shadcn-svelte-extras.com';
const GITHUB_DOC_BLOB_BASE = 'https://github.com/ieedan/shadcn-svelte-extras/blob/main/content';
const REGISTRY_ITEM_URL_BASE = 'https://shadcn-svelte-extras.com/r';

/** Bundled at build time so doc `<Code />` expansion works on Cloudflare (no `node:fs`). */
const rawLibLoaders = import.meta.glob('/src/lib/**/*', {
	query: '?raw',
	import: 'default'
}) as Record<string, () => Promise<string>>;

const DEFAULT_REGISTRY = '@ieedan/shadcn-svelte-extras';

function normalizeLibRelPath(path: string): string {
	return path.replace(/\\/g, '/').replace(/^\/+/, '');
}

/** Match Vite glob keys (`/src/lib/...`) to a repo-relative path (`src/lib/...`). */
function findRawLoader(relPath: string): (() => Promise<string>) | undefined {
	const n = normalizeLibRelPath(relPath);
	for (const key of [`/${n}`, n]) {
		const load = rawLibLoaders[key];
		if (load) return load;
	}
	return undefined;
}

function demoSourcePath(slug: string): string {
	return `src/lib/demos/${slug}.svelte`;
}

function demoGithubUrl(slug: string): string {
	return `${GITHUB_DOC_BLOB_BASE}/${demoSourcePath(slug)}`;
}

function formatJsrepoAddCommand(item: string, withoutRegistry: boolean): string {
	const target = withoutRegistry ? item : `${DEFAULT_REGISTRY}/${item}`;
	const resolved = resolveCommand('npm', 'execute', ['jsrepo', 'add', target]);
	return resolved ? `${resolved.command} ${resolved.args.join(' ')}` : `npx jsrepo add ${target}`;
}

function formatShadcnAddCommand(item: string): string {
	const url = `${REGISTRY_ITEM_URL_BASE}/${item}.json`;
	const resolved = resolveCommand('npm', 'execute', ['shadcn-svelte@latest', 'add', url]);
	return resolved
		? `${resolved.command} ${resolved.args.join(' ')}`
		: `npx shadcn-svelte@latest add ${url}`;
}

function formatDemoBlock(slug: string, liveUrl: string, sourceUrl: string): string {
	const relPath = demoSourcePath(slug);
	return (
		`#### Demo: \`${slug}\`\n\n` +
		`**Live:** [${liveUrl}](${liveUrl}) (full-page demo, same as the docs embed)\n\n` +
		`**Source:** [\`${relPath}\`](${sourceUrl}) on GitHub\n`
	);
}

function formatAddBlock(item: string, withoutRegistry: boolean): string {
	const jsrepo = formatJsrepoAddCommand(item, withoutRegistry);
	const shadcn = formatShadcnAddCommand(item);
	return (
		`#### Add \`${item}\`\n\n` +
		'**jsrepo**:\n\n' +
		'```bash\n' +
		jsrepo +
		'\n```\n\n' +
		'**shadcn-svelte**:\n\n' +
		'```bash\n' +
		shadcn +
		'\n```\n'
	);
}

function stripDemoAddImports(markdown: string): string {
	return markdown
		.replace(/^\s*import Demo from '\$lib\/components\/demo\.svelte';\s*\n/gm, '')
		.replace(/^\s*import Add from '\$lib\/components\/add\.svelte';\s*\n/gm, '');
}

function removeEmptyScriptBlocks(markdown: string): string {
	return markdown.replace(/<script lang="ts">([\s\S]*?)<\/script>\s*/g, (_, inner: string) => {
		if (!inner.replace(/^\s*$/gm, '').trim()) return '';
		return `<script lang="ts">${inner}</script>\n\n`;
	});
}

/** Map `$lib/…` specifiers (without `?raw`) to `src/lib/…` paths (Vite glob keys). */
function resolveLibImportPath(specifier: string): string {
	if (specifier.startsWith('$lib/')) {
		return `src/lib/${specifier.slice('$lib/'.length)}`.replace(/\\/g, '/');
	}
	throw new Error(`Unsupported raw import (expected \$lib/…): ${specifier}`);
}

/** Variable name → `src/lib/…` path for `import x from '…?raw'` in doc markdown. */
function parseRawImportMap(markdown: string): Map<string, string> {
	const map = new Map<string, string>();
	const re = /^\s*import\s+(\w+)\s+from\s+['"]([^'"]+)\?raw['"];\s*$/gm;
	let m: RegExpExecArray | null;
	while ((m = re.exec(markdown)) !== null) {
		const [, name, spec] = m;
		map.set(name, resolveLibImportPath(spec));
	}
	return map;
}

function extractHighlightRanges(attrs: string): number[][] | undefined {
	const match = attrs.match(/\bhighlight\s*=\s*\{/);
	if (!match || match.index === undefined) return undefined;
	let i = match.index + match[0].length - 1;
	if (attrs[i] !== '{') return undefined;
	let depth = 0;
	const start = i;
	for (; i < attrs.length; i++) {
		const c = attrs[i];
		if (c === '{') depth++;
		else if (c === '}') {
			depth--;
			if (depth === 0) {
				const inner = attrs.slice(start + 1, i);
				try {
					const parsed = JSON.parse(inner) as unknown;
					if (!Array.isArray(parsed)) return undefined;
					return parsed as number[][];
				} catch {
					return undefined;
				}
			}
		}
	}
	return undefined;
}

function parseCodeAttrs(attrs: string): {
	lang: string;
	codeVar: string;
	highlight?: number[][];
} | null {
	const langM = attrs.match(/\blang\s*=\s*["']([^"']+)["']/);
	const codeM = attrs.match(/\bcode\s*=\s*\{(\w+)\}/);
	if (!langM || !codeM) return null;
	const highlight = extractHighlightRanges(attrs);
	return { lang: langM[1], codeVar: codeM[1], highlight };
}

function highlightToFenceMeta(ranges: number[][]): string {
	if (!ranges.length) return '';
	const parts = ranges.map(([a, b]) => (a === b ? `${a}` : `${a}-${b}`));
	return ` {${parts.join(',')}}`;
}

function formatCodeFence(lang: string, content: string, highlight?: number[][]): string {
	const meta = highlight && highlight.length ? highlightToFenceMeta(highlight) : '';
	const body = content.replace(/\r\n/g, '\n').replace(/\n$/, '');
	return '```' + lang + meta + '\n' + body + '\n```\n';
}

async function replaceAsync(
	str: string,
	re: RegExp,
	replacer: (match: RegExpExecArray) => Promise<string>
): Promise<string> {
	const flags = re.flags.includes('g') ? re.flags : `${re.flags}g`;
	const globalRe = new RegExp(re.source, flags);
	const parts: string[] = [];
	let lastIndex = 0;
	let m: RegExpExecArray | null;
	while ((m = globalRe.exec(str)) !== null) {
		parts.push(str.slice(lastIndex, m.index));
		parts.push(await replacer(m));
		lastIndex = globalRe.lastIndex;
	}
	parts.push(str.slice(lastIndex));
	return parts.join('');
}

async function replaceCodeTags(
	markdown: string,
	rawMap: Map<string, string>,
	usedRawVars: Set<string>
): Promise<string> {
	const expand = async (attrs: string): Promise<string | null> => {
		const parsed = parseCodeAttrs(attrs);
		if (!parsed) return null;
		const relPath = rawMap.get(parsed.codeVar);
		if (!relPath) return null;
		const load = findRawLoader(relPath);
		if (!load) return null;
		let fileContent: string;
		try {
			fileContent = await load();
		} catch {
			return null;
		}
		usedRawVars.add(parsed.codeVar);
		return formatCodeFence(parsed.lang, fileContent, parsed.highlight);
	};

	let out = await replaceAsync(
		markdown,
		/<div>\s*<Code\s+([\s\S]*?)\/\s*>\s*<\/div>/gi,
		async (m) => (await expand(m[1]!)) ?? m[0]!
	);

	out = await replaceAsync(
		out,
		/<Code\s+([\s\S]*?)\/\s*>/g,
		async (m) => (await expand(m[1]!)) ?? m[0]!
	);

	return out;
}

function stripCodeDocImport(markdown: string): string {
	return markdown.replace(
		/^\s*import Code from '\$lib\/components\/docs\/code\.svelte';\s*\n/gm,
		''
	);
}

function stripApiReferenceImport(markdown: string): string {
	return markdown.replace(
		/^\s*import ApiReference from '\$lib\/docs\/api-reference\/api-reference\.svelte';\s*\n/gm,
		''
	);
}

function replaceApiReferenceTags(markdown: string, docSlug: string | undefined): string {
	const slug = docSlug?.match(/^components\/(.+)$/)?.[1];
	const ref = slug ? getReference(slug) : undefined;
	const replacement = ref ? referenceBundleToMarkdown(ref) : '';
	return markdown.replace(/<ApiReference\s*\/>/g, replacement);
}

function stripRawImports(markdown: string, vars: Set<string>): string {
	let out = markdown;
	for (const v of vars) {
		out = out.replace(
			new RegExp(`^\\s*import\\s+${v}\\s+from\\s+['"][^'"]+\\?raw['"];\\s*\\n`, 'gm'),
			''
		);
	}
	return out;
}

const DEMO_TAG = /<Demo\s+demo="([^"]+)"[^/]*\/>/g;
const ADD_TAG = /<Add\s+item="([^"]+)"([^/]*)\/>/g;

export async function transformDocMarkdown(markdown: string, docSlug?: string): Promise<string> {
	const rawImportMap = parseRawImportMap(markdown);
	const usedRawVars = new Set<string>();

	let merged = markdown.replace(DEMO_TAG, (_, slug: string) => {
		const liveUrl = `${DOC_SITE_ORIGIN}/demos/${slug}`;
		return formatDemoBlock(slug, liveUrl, demoGithubUrl(slug));
	});

	merged = merged.replace(ADD_TAG, (_, item: string, rest: string) => {
		const withoutRegistry = /\bwithoutRegistry\b/.test(rest);
		return formatAddBlock(item, withoutRegistry);
	});

	merged = await replaceCodeTags(merged, rawImportMap, usedRawVars);
	merged = replaceApiReferenceTags(merged, docSlug);
	merged = stripDemoAddImports(merged);
	merged = stripCodeDocImport(merged);
	merged = stripApiReferenceImport(merged);
	merged = stripRawImports(merged, usedRawVars);
	merged = removeEmptyScriptBlocks(merged);

	return merged.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}
