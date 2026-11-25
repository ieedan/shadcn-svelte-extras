<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useRename } from './rename.svelte.ts';

	useRename();

	let { children }: { children: Snippet } = $props();
</script>

{@render children?.()}
