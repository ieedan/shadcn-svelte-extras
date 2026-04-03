import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import transformLucideImports from 'vite-plugin-transform-lucide-imports';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const contentDirPath = path.join(__dirname, 'content');
export const veliteDirPath = path.join(__dirname, ".velite");

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
		transformLucideImports()
	],
	server: {
		fs: {
			allow: [veliteDirPath, contentDirPath]
		}
	}
});
