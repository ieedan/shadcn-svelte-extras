import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import transformLucideImports from 'vite-plugin-transform-lucide-imports';
import { sveltekitOG } from '@ethercorps/sveltekit-og/plugin'

export default defineConfig({
	plugins: [
		tailwindcss(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'cookie', 'baseLocale'],
			disableAsyncLocalStorage: true
		}),
		sveltekit(),
		transformLucideImports(),
		sveltekitOG()
	]
});
