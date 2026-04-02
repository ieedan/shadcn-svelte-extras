import { error } from '@sveltejs/kit';
import type { Component } from 'svelte';

function slugFromPath(path: string) {
	return path.replace('/content/', '').replace('.md', '').replace('/index', '').trim();
}

export async function getDocComponent(slug: string): Promise<Component> {
	const modules = import.meta.glob<{ default: Component }>('/content/**/*.md');

	for (const [path, load] of Object.entries(modules)) {
		if (slugFromPath(path) === slug) {
			const mod = await load();
			return mod.default;
		}
	}

	error(404, 'Could not find the documentation page.');
}
