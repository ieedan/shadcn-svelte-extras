<script lang="ts">
	import { TAILWIND_BREAKPOINTS, useMedia } from '$lib/hooks/use-media.svelte';
	import { scale } from 'svelte/transition';

	const media = useMedia({ ...TAILWIND_BREAKPOINTS, custom: '500px' });
</script>

<div class="flex flex-col place-items-center gap-2 px-4">
	{#if media.custom}
		<span in:scale={{ duration: 300 }} class="text-xl"> custom </span>
	{:else}
		<span in:scale={{ duration: 300 }} class="text-xl"> - </span>
	{/if}
	<span class="text-muted-foreground text-center text-xs">
		Resize the window to see the breakpoint change at 500px.
	</span>
</div>
