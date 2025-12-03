import { redirect } from '@sveltejs/kit';

// just in case anyone linked to the old path

export function load() {
	throw redirect(307, '/components/avatar-group');
}
