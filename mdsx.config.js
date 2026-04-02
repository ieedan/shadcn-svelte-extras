// @ts-check
import { resolve } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { toString } from 'hast-util-to-string';
import parseNumericRange from 'parse-numeric-range';
import rehypeSlug from 'rehype-slug';
import { codeImport } from 'remark-code-import';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import { defineConfig } from 'mdsx';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/**
 * @typedef {import('mdast').Root} MdastRoot
 * @typedef {import('hast').Root} HastRoot
 * @typedef {import('unified').Transformer<HastRoot, HastRoot>} HastTransformer
 * @typedef {import('unified').Transformer<MdastRoot, MdastRoot>} MdastTransformer
 */

export const mdsxConfig = defineConfig({
	extensions: ['.md'],
	remarkPlugins: [remarkGfm, codeImport, remarkRemovePrettierIgnore],
	rehypePlugins: [rehypeSlug, rehypePreData, rehypeAttachMdsxCodeProps],
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
 * Fenced blocks are highlighted by the blueprint `pre` → ui `Code.Root`. Pass source + line meta as data attributes.
 * @returns {HastTransformer}
 */
function rehypeAttachMdsxCodeProps() {
	return (tree) => {
		visit(tree, 'element', (node) => {
			if (node.tagName !== 'pre') return;
			const codeEl = node.children?.[0];
			if (!codeEl || codeEl.type !== 'element' || codeEl.tagName !== 'code') return;

			const raw = toString(codeEl);
			const className = codeEl.properties?.className;
			let lang = 'plaintext';
			if (Array.isArray(className)) {
				const langClass = className.find(
					(c) => typeof c === 'string' && c.startsWith('language-')
				);
				if (typeof langClass === 'string') lang = langClass.replace(/^language-/, '');
			}

			const meta =
				codeEl.data && 'meta' in codeEl.data && typeof codeEl.data.meta === 'string'
					? codeEl.data.meta
					: '';

			/** @type {number[]} */
			const highlights = [];
			if (meta) {
				for (const m of meta.matchAll(/\{([^}]*)\}/g)) {
					const inner = m[1]?.trim();
					if (!inner) continue;
					try {
						highlights.push(...parseNumericRange(inner));
					} catch {
						/* ignore invalid ranges */
					}
				}
			}

			const p = node.properties ?? (node.properties = {});
			p['data-mdsx-raw'] = Buffer.from(raw, 'utf8').toString('base64url');
			p['data-mdsx-lang'] = lang;
			const uniq = [...new Set(highlights)].sort((a, b) => a - b);
			if (uniq.length) p['data-mdsx-highlight'] = uniq.join(',');
		});
	};
}
