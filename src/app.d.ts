// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	// Shared Shiki highlighter for mdsx / rehype-pretty-code (see mdsx.config.js)
	var __shikiHighlighter: import('shiki/core').HighlighterCore | undefined;

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
