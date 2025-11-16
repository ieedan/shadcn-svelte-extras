import { DEMOS } from "$lib/demos/index.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
	if (!DEMOS.includes(params.path as never)) {
		error(404, 'Demo not found');
	}
	return {
		path: params.path
	};
}
