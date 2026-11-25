import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import transformLucideImports from 'vite-plugin-transform-lucide-imports';
import { readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsx } from 'mdsx';
import { mdsxConfig } from './mdsx.config.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const contentDirPath = path.join(__dirname, 'content');
export const veliteDirPath = path.join(__dirname, '.velite');

function markdownPrerenderEntries(contentRoot: string): `/${string}`[] {
	const paths: `/${string}`[] = [];
	function walk(dir: string) {
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
				paths.push(`/docs/${rel}.md`);
			}
		}
	}
	walk(contentRoot);
	return paths;
}

const mdPrerenderPaths = markdownPrerenderEntries(join(__dirname, 'content'));

export default defineConfig({
	plugins: [
		tailwindcss(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'cookie', 'baseLocale'],
			disableAsyncLocalStorage: true
		}),
		sveltekit({
			// Consult https://svelte.dev/docs/kit/integrations
			// for more information about preprocessors
			preprocess: [vitePreprocess(), mdsx(mdsxConfig)],
			extensions: ['.svelte', '.md'],

			adapter: adapter(),
			prerender: {
				entries: mdPrerenderPaths
			},
			paths: {
				origin: 'https://shadcn-svelte-extras.com',
			}
		}),
		transformLucideImports()
	],
	server: {
		fs: {
			allow: [veliteDirPath, contentDirPath]
		}
	}
});
