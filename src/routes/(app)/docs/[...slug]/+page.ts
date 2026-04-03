import { getDoc } from "$lib/features/docs/docs";
import { error } from "@sveltejs/kit";

export const prerender = true;

export async function load({ params }) {
	const doc = await getDoc(params.slug);

	if (!doc) error(404, 'Not found')

	return { doc };
}
