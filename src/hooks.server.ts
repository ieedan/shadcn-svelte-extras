import type { Handle } from '@sveltejs/kit';
import { getDocMarkdown } from '$lib/docs/get-doc-markdown';
import { paraglideMiddleware } from '$lib/paraglide/server';

// creating a handle to use the paraglide middleware
const paraglideHandle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;

		const pathname = event.url.pathname;
		if (
			localizedRequest.method === 'GET' &&
			pathname.endsWith('.md') &&
			pathname.length > 3 &&
			pathname !== '/.md'
		) {
			const slug = pathname.slice(1, -3);
			return getDocMarkdown(slug).then((text) => {
				if (text !== null) {
					return new Response(text, {
						headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
					});
				}
				return new Response('Not Found', { status: 404 });
			});
		}

		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('%lang%', locale);
			}
		});
	});

export const handle: Handle = paraglideHandle;
