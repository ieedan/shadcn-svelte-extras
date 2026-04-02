import {
	DOC_SITE_ORIGIN,
	GITHUB_DOC_BLOB_BASE,
	REGISTRY_ITEM_URL_BASE
} from '$lib/constants';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { resolveCommand } from 'package-manager-detector/commands';

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '..');

const DEFAULT_REGISTRY = '@ieedan/shadcn-svelte-extras';

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
		'**jsrepo** (default registry: `' +
		DEFAULT_REGISTRY +
		'`):\n\n' +
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

/** Map `$lib/…` specifiers (without `?raw`) to absolute repo paths. */
function resolveLibImport(specifier: string): string {
	if (specifier.startsWith('$lib/')) {
		return join(REPO_ROOT, 'src/lib', specifier.slice('$lib/'.length));
	}
	throw new Error(`Unsupported raw import (expected \$lib/…): ${specifier}`);
}

/** Variable name → filesystem path for `import x from '…?raw'` in doc markdown. */
function parseRawImportMap(markdown: string): Map<string, string> {
	const map = new Map<string, string>();
	const re = /^\s*import\s+(\w+)\s+from\s+['"]([^'"]+)\?raw['"];\s*$/gm;
	let m: RegExpExecArray | null;
	while ((m = re.exec(markdown)) !== null) {
		const [, name, spec] = m;
		map.set(name, resolveLibImport(spec));
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
	const meta =
		highlight && highlight.length ? highlightToFenceMeta(highlight) : '';
	const body = content.replace(/\r\n/g, '\n').replace(/\n$/, '');
	return '```' + lang + meta + '\n' + body + '\n```\n';
}

function replaceCodeTags(
	markdown: string,
	rawMap: Map<string, string>,
	usedRawVars: Set<string>
): string {
	const expand = (attrs: string): string | null => {
		const parsed = parseCodeAttrs(attrs);
		if (!parsed) return null;
		const filePath = rawMap.get(parsed.codeVar);
		if (!filePath) return null;
		let fileContent: string;
		try {
			fileContent = readFileSync(filePath, 'utf8');
		} catch {
			return null;
		}
		usedRawVars.add(parsed.codeVar);
		return formatCodeFence(parsed.lang, fileContent, parsed.highlight);
	};

	let out = markdown.replace(/<div>\s*<Code\s+([\s\S]*?)\/\s*>\s*<\/div>/gi, (full, attrs: string) => {
		return expand(attrs) ?? full;
	});

	out = out.replace(/<Code\s+([\s\S]*?)\/\s*>/g, (full, attrs: string) => {
		return expand(attrs) ?? full;
	});

	return out;
}

function stripCodeDocImport(markdown: string): string {
	return markdown.replace(
		/^\s*import Code from '\$lib\/components\/docs\/code\.svelte';\s*\n/gm,
		''
	);
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

export function transformDocMarkdown(markdown: string): string {
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

	merged = replaceCodeTags(merged, rawImportMap, usedRawVars);
	merged = stripDemoAddImports(merged);
	merged = stripCodeDocImport(merged);
	merged = stripRawImports(merged, usedRawVars);
	merged = removeEmptyScriptBlocks(merged);

	return merged.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}
