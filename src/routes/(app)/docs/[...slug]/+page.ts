import { allDocs, getDoc } from '$lib/features/docs/docs';
import { error } from '@sveltejs/kit';
import type { EntryGenerator } from './$types';

export const prerender = true;

export const entries: EntryGenerator = () =>
	allDocs.map((doc) => ({
		slug: doc.href === '/docs' ? '' : doc.href.replace(/^\/docs\//, '')
	}));

export async function load({ params }) {
	const doc = await getDoc(params.slug);

	if (!doc) error(404, 'Not found');

	return { doc };
}
