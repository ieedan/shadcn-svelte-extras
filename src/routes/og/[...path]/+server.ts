import { error } from '@sveltejs/kit';
import { ImageResponse } from '@ethercorps/sveltekit-og';
import OG from './og.svelte';
import { map } from '$lib/map';
import { removeLeadingAndTrailingSlash } from '$lib/utils/url';

export async function GET({ params }) {
	const routes = Object.entries(map).flatMap(([_, routes]) => routes);

	const route = routes.find((route) => removeLeadingAndTrailingSlash(route.href) === removeLeadingAndTrailingSlash(params.path));
	if (!route) error(404, 'Not found!');

	const { name: title, description } = route;

	return new ImageResponse(
		OG,
		{
			width: 1200,
			height: 630,
			debug: false
		},
		{
			title,
			description
		}
	);
}
