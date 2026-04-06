import { addLeadingSlash, join, removeLeadingSlash, removeTrailingSlash } from '$lib/utils/url';
import { defineCollection, defineConfig, s } from 'velite';

const docSchema = s
	.object({
		title: s.string(),
		description: s.string(),
		path: s.path(),
		navLabel: s.string().optional(),
		links: s
			.object({
				doc: s.string().optional(),
				api: s.string().optional(),
				source: s.string().optional()
			})
			.optional(),
		component: s.boolean().default(false),
		toc: s.toc(),
		indicator: s.union([s.literal('new'), s.literal('updated')]).optional()
	})
	.transform((data) => {
		return {
			...data,
			slug: removeLeadingSlash(data.path),
			href: addLeadingSlash(removeTrailingSlash(join('/docs', data.path).replace('index', '')))
		};
	});

const gettingStarted = defineCollection({
	name: 'gettingStarted',
	pattern: './*.md',
	schema: docSchema
});

const components = defineCollection({
	name: 'components',
	pattern: './components/**/*.md',
	schema: docSchema
});

const actions = defineCollection({
	name: 'actions',
	pattern: './actions/**/*.md',
	schema: docSchema
});

const hooks = defineCollection({
	name: 'components',
	pattern: './hooks/**/*.md',
	schema: docSchema
});

export default defineConfig({
	root: './content',
	collections: {
		gettingStarted,
		components,
		actions,
		hooks
	},
	output: { assets: 'static' }
});
