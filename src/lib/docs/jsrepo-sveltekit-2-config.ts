import { defineConfig } from 'jsrepo';
import { DEFAULT_LANGS, type Language } from 'jsrepo/langs';

// @migration-task remove this when upgrading to SvelteKit 3 to allow for .ts imports when adding components
// SvelteKit 2 projects can't import `.ts` files using the `.ts` extension (without `allowImportingTsExtensions`)
// so we swap `.ts` for `.js` after jsrepo has finished transforming the imports.
const tsToJs = (language: Language): Language => ({
	...language,
	transformImports: async (code, imports, options) => {
		const transformed = await language.transformImports(code, imports, options);

		return transformed.replace(
			/(\b(?:from|import)\s*\(?\s*)(['"])([^'"\n]+?)(?<!\.d)\.ts\2/g,
			'$1$2$3.js$2'
		);
	}
});

export default defineConfig({
	registries: ['@ieedan/shadcn-svelte-extras'],
	languages: DEFAULT_LANGS.map(tsToJs),
	paths: {
		ui: '$lib/components/ui',
		component: '$lib/components',
		hook: '$lib/hooks',
		action: '$lib/actions',
		util: '$lib/utils',
		lib: '$lib'
	}
});
