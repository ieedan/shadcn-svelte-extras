import { slugFromPath } from './get-doc';
import { transformDocMarkdown } from './transform-doc-markdown';

const rawModules = import.meta.glob<string>('/content/**/*.md', {
	query: '?raw',
	import: 'default'
});

export async function getDocMarkdown(slug: string): Promise<string | null> {
	for (const [path, load] of Object.entries(rawModules)) {
		if (slugFromPath(path) === slug) {
			const raw = await load();
			return await transformDocMarkdown(raw, slug);
		}
	}
	return null;
}
