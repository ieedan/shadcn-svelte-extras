import {
	DOC_SITE_ORIGIN,
	GITHUB_DOC_BLOB_BASE,
	REGISTRY_ITEM_URL_BASE
} from '$lib/constants';
import { resolveCommand } from 'package-manager-detector/commands';

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

const DEMO_TAG = /<Demo\s+demo="([^"]+)"[^/]*\/>/g;
const ADD_TAG = /<Add\s+item="([^"]+)"([^/]*)\/>/g;

export function transformDocMarkdown(markdown: string): string {
	let merged = markdown.replace(DEMO_TAG, (_, slug: string) => {
		const liveUrl = `${DOC_SITE_ORIGIN}/demos/${slug}`;
		return formatDemoBlock(slug, liveUrl, demoGithubUrl(slug));
	});

	merged = merged.replace(ADD_TAG, (_, item: string, rest: string) => {
		const withoutRegistry = /\bwithoutRegistry\b/.test(rest);
		return formatAddBlock(item, withoutRegistry);
	});

	merged = stripDemoAddImports(merged);
	merged = removeEmptyScriptBlocks(merged);

	return merged.replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}
