import { getDocComponent } from '$lib/docs/get-doc';
import { map } from '$lib/map';
import type { EntryGenerator, PageLoad } from './$types';

function hrefToSlug(href: string) {
	return href.replace(/^\//, '');
}

export const prerender = true;

export const entries: EntryGenerator = () => {
	const slugs = new Set<string>();
	for (const routes of Object.values(map)) {
		for (const r of routes) {
			slugs.add(hrefToSlug(r.href));
		}
	}
	return [...slugs].map((slug) => ({ slug }));
};

export const load: PageLoad = async ({ params }) => {
	const component = await getDocComponent(params.slug);
	return { component };
};
