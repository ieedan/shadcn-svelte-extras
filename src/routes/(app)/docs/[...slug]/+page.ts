import { getDoc } from '$lib/features/docs/docs';
import { error } from '@sveltejs/kit';

// Intentionally not prerendered: the `hooks.server.ts` content-negotiation
// handler needs to run on every `/docs/*` request so `Accept: text/markdown`
// can be served Markdown from the same URL (see https://acceptmarkdown.com).
// The `.md` twin endpoint is still prerendered for fast agent reads.

export async function load({ params }) {
	const doc = await getDoc(params.slug);

	if (!doc) error(404, 'Not found');

	return { doc };
}
