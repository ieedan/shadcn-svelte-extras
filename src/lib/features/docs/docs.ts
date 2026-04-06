import type { Component } from 'svelte';
import { gettingStarted, components, actions, hooks } from '$content/index.js';
import type { CurrentDoc } from './types';
import { join } from '$lib/utils/url';

export const allDocs = [
	...gettingStarted.map((doc) => ({ ...doc, group: 'Getting Started' })),
	...components.map((doc) => ({ ...doc, group: 'Components' })),
	...actions.map((doc) => ({ ...doc, group: 'Actions' })),
	...hooks.map((doc) => ({ ...doc, group: 'Hooks' }))
];

export const groupedDocs = {
	'Getting Started': reorder(gettingStarted, ['index', 'installation']),
	Components: components,
	Actions: actions,
	Hooks: hooks
};

export async function getDoc(path: string): Promise<CurrentDoc | null> {
	const index = allDocs.findIndex((doc) => {
		return doc.slug === path || doc.slug === join(path, 'index');
	});

	if (index === -1) return null;

	const doc = allDocs[index];
	const docComponent = await getComponent(doc.slug);

	if (!docComponent) return null;

	return {
		doc: allDocs[index],
		next: allDocs[index + 1] || null,
		prev: allDocs[index - 1] || null,
		component: docComponent
	};
}

export function slugFromPath(path: string) {
	return path.replace('/content/', '').replace('.md', '').replace('/index', '').trim();
}

export async function getComponent(slug: string): Promise<Component | null> {
	const modules = import.meta.glob<{ default: Component }>('/content/**/*.md');

	for (const [path, load] of Object.entries(modules)) {
		if (slugFromPath(path) === slug) {
			const mod = await load();
			return mod.default;
		}
	}

	return null;
}

function reorder<T extends { slug: string }>(
	docs: readonly T[],
	slugOrder: readonly string[]
): T[] {
	const rank = new Map(slugOrder.map((slug, i) => [slug, i]));
	return [...docs].sort((a, b) => {
		const ar = rank.get(a.slug) ?? slugOrder.length;
		const br = rank.get(b.slug) ?? slugOrder.length;
		if (ar !== br) return ar - br;
		return a.slug.localeCompare(b.slug);
	});
}
