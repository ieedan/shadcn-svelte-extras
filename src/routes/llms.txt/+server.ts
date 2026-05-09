import { buildSitemapMarkdown } from '$lib/features/docs/markdown/sitemap';

export const prerender = true;

export function GET({ url }) {
	const body = buildSitemapMarkdown(url.origin);
	return new Response(body, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			Vary: 'Accept'
		}
	});
}
