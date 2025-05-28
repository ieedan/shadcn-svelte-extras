import type { HTMLAttributes } from 'svelte/elements';
import GitHub from './github.svelte';
import Svelte from './svelte.svelte';
import CSS from './css.svelte';
import MCP from './mcp.svelte';
import TypeScript from './typescript.svelte';

export interface Props extends HTMLAttributes<SVGElement> {
	class?: string;
	width?: number;
	height?: number;
}

export { GitHub, Svelte, CSS, TypeScript, MCP };
