import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsx } from 'mdsx';
import { mdsxConfig } from './mdsx.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsx(mdsxConfig)],
	extensions: ['.svelte', '.md'],

	kit: {
		adapter: adapter(),
		prerender: {
			origin: 'https://shadcn-svelte-extras.com'
		}
	}
};

export default config;
