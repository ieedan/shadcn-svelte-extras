import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsx } from 'mdsx';
import { mdsxConfig } from './mdsx.config.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

/** @param {string} contentRoot */
function markdownPrerenderEntries(contentRoot) {
	/** @type {string[]} */
	const paths = [];
	/** @param {string} dir */
	function walk(dir) {
		for (const name of readdirSync(dir)) {
			const full = join(dir, name);
			if (statSync(full).isDirectory()) {
				walk(full);
			} else if (name.endsWith('.md')) {
				let rel = relative(contentRoot, full).replaceAll('\\', '/');
				rel = rel.replace(/\.md$/, '');
				if (rel.endsWith('/index')) {
					rel = rel.slice(0, -'/index'.length);
				}
				paths.push(`/${rel}.md`);
			}
		}
	}
	walk(contentRoot);
	return paths;
}

const mdPrerenderPaths = markdownPrerenderEntries(join(__dirname, 'content'));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsx(mdsxConfig)],
	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter(),
		prerender: {
			origin: 'https://shadcn-svelte-extras.com',
			entries: mdPrerenderPaths
		}
	}
};

export default config;
