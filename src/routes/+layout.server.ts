import { USER_CONFIG_COOKIE_NAME, userConfigSchema } from '$lib/user-config.svelte';
import { defineBaseMetaTags } from 'svelte-meta-tags';

const SITE = 'shadcn-svelte-extras';
const DEFAULT_DESCRIPTION = 'Finish your app with awesome svelte components';
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

export async function load({ url, cookies }) {
	const userConfigCookie = cookies.get(USER_CONFIG_COOKIE_NAME);
	const parsedUserConfig = userConfigCookie ? JSON.parse(userConfigCookie) : {};
	const userConfig = userConfigSchema.parse(parsedUserConfig);

	const canonical = new URL(url.pathname, url.origin).href;

	const baseTags = defineBaseMetaTags({
		title: SITE,
		description: DEFAULT_DESCRIPTION,
		canonical,
		keywords: [...KEYWORDS],
		openGraph: {
			type: 'website',
			url: canonical,
			title: SITE,
			description: DEFAULT_DESCRIPTION,
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
			title: SITE,
			description: DEFAULT_DESCRIPTION,
			image: OG_IMAGE,
			creator: '@ieeeedan'
		}
	});

	return { ...baseTags, userConfig };
}
