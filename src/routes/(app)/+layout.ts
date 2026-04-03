import { definePageMetaTags } from 'svelte-meta-tags';
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

export const load: LayoutLoad = ({ url }) => {
	const description = `Finish your app with awesome svelte components like phone-input, tags-input, star-rating, file-drop-zone and more`

	const title = SITE;
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
