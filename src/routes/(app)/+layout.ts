import { definePageMetaTags } from 'svelte-meta-tags';
import { map, type Route } from '$lib/map';
import type { LayoutLoad } from './$types';

const SITE = 'shadcn-svelte-extras';
const OG_IMAGE = 'https://shadcn-svelte-extras.com/og.png';

const KEYWORDS = [
	'shadcn-svelte',
	'extras',
	'svelte',
	'components',
	'cli',
	'jsrepo',
	'mcp',
	'phone-input',
	'tags-input',
	'star-rating',
	'file-drop-zone'
] as const;

function flattenDocs(): Array<{ group: string } & Route> {
	return Object.entries(map).flatMap(([group, routes]) => routes.map((r) => ({ group, ...r })));
}

function getDocForPathname(pathname: string): ({ group: string } & Route) | undefined {
	const docs = flattenDocs();
	return docs.find((doc) => new URL(doc.href, 'https://example.com').pathname === pathname);
}

function componentsIntroDescription(): string {
	return Array.from(Object.entries(map))
		.filter(([cat]) => cat === 'Components')
		.flatMap(([_, components]) =>
			components.map((comp, i) => `${i === components.length - 1 ? 'and ' : ''}${comp.name}`)
		)
		.join(', ');
}

export const load: LayoutLoad = ({ url }) => {
	const doc = getDocForPathname(url.pathname);

	if (!doc) {
		return {};
	}

	const description =
		doc.name === 'Introduction'
			? `Finish your app with awesome svelte components like ${componentsIntroDescription()}`
			: doc.description;

	const title = `${doc.name} - ${SITE}`;
	const canonical = new URL(url.pathname, url.origin).href;

	const pageTags = definePageMetaTags({
		title,
		description,
		canonical,
		keywords: [...KEYWORDS],
		openGraph: {
			url: canonical,
			type: 'website',
			title,
			description,
			siteName: SITE,
			images: [
				{
					url: OG_IMAGE,
					width: 2014,
					height: 1143,
					alt: 'shadcn-svelte-extras - Finish your app.'
				}
			]
		},
		twitter: {
			cardType: 'summary_large_image',
			title,
			description,
			image: OG_IMAGE,
			creator: '@ieeeedan'
		}
	});

	return { ...pageTags };
};
