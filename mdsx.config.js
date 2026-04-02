// @ts-check
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { codeImport } from 'remark-code-import';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { defineConfig } from 'mdsx';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const jsEngine = createJavaScriptRegexEngine();

export async function createHighlighter() {
	if (!globalThis.__shikiHighlighter) {
		globalThis.__shikiHighlighter = await createHighlighterCore({
			themes: [
				import('@shikijs/themes/github-dark'),
				import('@shikijs/themes/github-light-default'),
			],
			langs: [
				import('@shikijs/langs/typescript'),
				import('@shikijs/langs/svelte'),
				import('@shikijs/langs/css'),
				import('@shikijs/langs/json'),
				import('@shikijs/langs/bash'),
				import('@shikijs/langs/diff'),
			],
			engine: jsEngine,
		});
	}
	return globalThis.__shikiHighlighter;
}

/**
 * @typedef {import('mdast').Root} MdastRoot
 * @typedef {import('hast').Root} HastRoot
 * @typedef {import('unified').Transformer<HastRoot, HastRoot>} HastTransformer
 * @typedef {import('unified').Transformer<MdastRoot, MdastRoot>} MdastTransformer
 */

/**
 * @type {import('rehype-pretty-code').Options}
 */
const prettyCodeOptions = {
	theme: {
		dark: 'github-dark',
		light: 'github-light-default',
	},
	keepBackground: false,
	// @ts-expect-error rehype-pretty-code accepts a custom highlighter factory
	getHighlighter: createHighlighter,
	onVisitLine(node) {
		if (node.children.length === 0) {
			node.children = [{ type: 'text', value: ' ' }];
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className = ['line--highlighted'];
	},
	onVisitHighlightedChars(node) {
		node.properties.className = ['chars--highlighted'];
	},
};

export const mdsxConfig = defineConfig({
	extensions: ['.md'],
	remarkPlugins: [remarkGfm, codeImport, remarkRemovePrettierIgnore],
	rehypePlugins: [
		rehypeSlug,
		rehypePreData,
		[rehypePrettyCode, prettyCodeOptions],
		rehypeHandleMetadata,
	],
	blueprints: {
		default: {
			path: resolve(__dirname, './src/lib/components/mdsx/blueprint.svelte'),
		},
	},
});

/**
 * @returns {MdastTransformer}
 */
function remarkRemovePrettierIgnore() {
	return async (tree) => {
		visit(tree, 'code', (node) => {
			node.value = node.value
				.replaceAll('<!-- prettier-ignore -->\n', '')
				.replaceAll('// prettier-ignore\n', '');
		});
	};
}

/**
 * @returns {HastTransformer}
 */
function rehypePreData() {
	return (tree) => {
		visit(tree, (node) => {
			if (node?.type === 'element' && node?.tagName === 'pre') {
				const [codeEl] = node.children;
				if (codeEl.type !== 'element') return;
				if (codeEl.tagName !== 'code') return;

				if (
					codeEl.data &&
					'meta' in codeEl.data &&
					codeEl.data.meta &&
					typeof codeEl.data.meta === 'string'
				) {
					const regex = /event="([^"]*)"/;
					const match = codeEl.data?.meta.match(regex);
					if (match) {
						// @ts-expect-error custom field for optional integrations
						node.__event__ = match ? match[1] : null;
						codeEl.data.meta = codeEl.data.meta.replace(regex, '');
					}
				}

				// @ts-expect-error custom fields consumed by markdown pre component
				node.__rawString__ = codeEl.children?.[0].value;
				// @ts-expect-error unknown properties on pre element
				node.__src__ = node.properties?.__src__;
				// @ts-expect-error unknown properties on pre element
				node.__style__ = node.properties?.__style__;
			}
		});
	};
}

/**
 * @returns {HastTransformer}
 */
function rehypeHandleMetadata() {
	return async (tree) => {
		visit(tree, (node) => {
			if (node?.type === 'element' && node?.tagName === 'figure') {
				if (!('data-rehype-pretty-code-figure' in node.properties)) {
					return;
				}

				const preElement = node.children.at(-1);
				if (preElement && 'tagName' in preElement && preElement.tagName !== 'pre') {
					return;
				}

				const firstChild = node.children.at(0);

				if (firstChild && 'tagName' in firstChild && firstChild.tagName === 'figcaption') {
					node.properties['data-metadata'] = '';
					const lastChild = node.children.at(-1);
					if (lastChild && 'properties' in lastChild) {
						lastChild.properties['data-metadata'] = '';
					}
				}
			}
		});
	};
}
