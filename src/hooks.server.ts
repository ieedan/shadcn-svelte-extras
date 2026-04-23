import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '$lib/paraglide/server';
import {
	mergeVaryAccept,
	preferredResponseFormat
} from '$lib/features/docs/markdown/accept-header';
import { getDocMarkdown } from '$lib/features/docs/markdown/get-doc-markdown';
import { buildSitemapMarkdown } from '$lib/features/docs/markdown/sitemap';

const MARKDOWN_HEADERS = {
	'Content-Type': 'text/markdown; charset=utf-8',
	Vary: 'Accept'
} as const;

/**
 * Content negotiation per https://acceptmarkdown.com: when a client asks for
 * Markdown we serve it from the same URL; when the Accept header genuinely
 * can't be satisfied (no `* / *` fallback, no `text/html`, no `text/markdown`)
 * we return 406; otherwise we fall through to the normal HTML response and
 * tag it with `Vary: Accept`.
 */
const contentNegotiationHandle: Handle = async ({ event, resolve }) => {
	const { request, url } = event;

	if (request.method === 'GET' || request.method === 'HEAD') {
		const preference = preferredResponseFormat(request.headers.get('accept'));

		if (preference === 'markdown') {
			const markdown = await tryRenderMarkdown(url);
			if (markdown !== null) {
				return new Response(request.method === 'HEAD' ? null : markdown, {
					headers: MARKDOWN_HEADERS
				});
			}
		}

		if (preference === 'other') {
			const body = 'Not Acceptable. Available representations: text/html, text/markdown.\n';
			return new Response(request.method === 'HEAD' ? null : body, {
				status: 406,
				headers: {
					'Content-Type': 'text/plain; charset=utf-8',
					Vary: 'Accept'
				}
			});
		}
	}

	const response = await resolve(event);
	response.headers.set('Vary', mergeVaryAccept(response.headers.get('Vary')));
	return response;
};

async function tryRenderMarkdown(url: URL): Promise<string | null> {
	const pathname = url.pathname.replace(/\/+$/, '') || '/';

	if (pathname === '/') {
		return buildSitemapMarkdown(url.origin);
	}

	if (pathname.startsWith('/docs/') && !pathname.endsWith('.md')) {
		const slug = pathname.slice('/docs/'.length);
		return await getDocMarkdown(slug);
	}

	if (pathname === '/docs') {
		return await getDocMarkdown('index');
	}

	return null;
}

const paraglideHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;

		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('%lang%', locale);
			}
		});
	});

export const handle: Handle = sequence(contentNegotiationHandle, paraglideHandle);
