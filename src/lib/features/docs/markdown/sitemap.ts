import { groupedDocs } from '../docs';

const SITE_NAME = 'shadcn-svelte-extras';
const SITE_DESCRIPTION =
	'shadcn-svelte-extras is a collection of components, hooks, and actions that follow the same styling as shadcn-svelte.';

/**
 * Build a Markdown sitemap for AI agents.
 *
 * Every entry lists both the human-friendly page URL and the agent-friendly
 * `.md` URL, so an agent that lands here can navigate straight to the clean
 * Markdown representation of any doc page.
 */
export function buildSitemapMarkdown(origin: string): string {
	const base = origin.replace(/\/$/, '');

	const lines: string[] = [];
	lines.push(`# ${SITE_NAME}`);
	lines.push('');
	lines.push(`> ${SITE_DESCRIPTION}`);
	lines.push('');
	lines.push(
		'This page is the agent-facing sitemap. Every doc on this site is available as ' +
			'Markdown either by appending `.md` to the page URL or by sending an ' +
			'`Accept: text/markdown` header to the same URL.'
	);
	lines.push('');
	lines.push('## How to read the docs as Markdown');
	lines.push('');
	lines.push(
		'- Append `.md` to any doc URL (for example `/docs/components/button.md`).'
	);
	lines.push(
		'- Or request the HTML URL with `Accept: text/markdown` and the server ' +
			'will respond with `Content-Type: text/markdown; charset=utf-8` ' +
			'(see https://acceptmarkdown.com).'
	);
	lines.push('');

	for (const [group, docs] of Object.entries(groupedDocs)) {
		if (docs.length === 0) continue;
		lines.push(`## ${group}`);
		lines.push('');
		for (const doc of docs) {
			const pageUrl = `${base}${doc.href}`;
			const mdUrl = `${base}/docs/${doc.slug}.md`;
			const label = doc.navLabel ?? doc.title;
			lines.push(`- [${label}](${pageUrl}) — ${doc.description} ([Markdown](${mdUrl}))`);
		}
		lines.push('');
	}

	return lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n';
}
