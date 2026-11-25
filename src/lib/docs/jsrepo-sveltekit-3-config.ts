import { defineConfig } from 'jsrepo';

export default defineConfig({
	registries: ['@ieedan/shadcn-svelte-extras'],
	paths: {
		ui: '#lib/components/ui',
		component: '#lib/components',
		hook: '#lib/hooks',
		action: '#lib/actions',
		util: '#lib/utils',
		lib: '#lib'
	}
});
