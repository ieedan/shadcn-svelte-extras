import { slugFromPath } from './get-doc';

const rawModules = import.meta.glob<string>('/content/**/*.md', {
	query: '?raw',
	import: 'default'
});

export async function getDocMarkdown(slug: string): Promise<string | null> {
	for (const [path, load] of Object.entries(rawModules)) {
		if (slugFromPath(path) === slug) {
			return await load();
		}
	}
	return null;
}
