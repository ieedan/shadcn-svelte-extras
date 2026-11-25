import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import * as importX from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					varsIgnorePattern: '^_',
					argsIgnorePattern: '^_'
				}
			],
			'no-prototype-builtins': 'off',
			'no-useless-escape': 'off',
			'svelte/no-navigation-without-resolve': 'off'
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],

		languageOptions: {
			parserOptions: {
				// it just ain't worth it man
				// projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser
			}
		},
		rules: {
			'svelte/no-useless-mustaches': 'off'
		}
	},
	{
		// Imports must use the extension of the file they point to (`.ts`, `.svelte`, `.svelte.ts`).
		// SvelteKit 3's `#lib/*` imports need the full file name, and jsrepo keeps this extension
		// when it installs registry components (SvelteKit 2 projects get `.ts` swapped for `.js` on install).
		files: ['**/*.ts', '**/*.js', '**/*.svelte'],
		plugins: { 'import-x': importX },
		settings: { 'import-x/resolver-next': [createTypeScriptImportResolver()] },
		rules: {
			'import-x/extensions': [
				'error',
				'always',
				{
					ignorePackages: true,
					fix: true,
					// `.js` is never right for a `.ts` file, real `.js` files are ignored below
					pattern: { js: 'never', ts: 'always', svelte: 'always' },
					pathGroupOverrides: [
						{ pattern: '$app/**', action: 'ignore' }, // SvelteKit virtual modules
						{ pattern: '#lib/paraglide/**', action: 'ignore' }, // generated `.js`
						{ pattern: '#content/**', action: 'ignore' } // velite's generated `.js`
					]
				}
			]
		}
	}
);
