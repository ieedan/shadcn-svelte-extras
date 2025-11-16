<script lang="ts">
	import { useMedia } from '$lib/hooks/use-media.svelte';
	import { scale } from 'svelte/transition';

	const media = useMedia();
</script>

<div class="flex flex-col place-items-center gap-2 px-4">
	{#if media['2xl']}
		{@render breakpoint({ name: '2xl' })}
	{:else if media.xl}
		{@render breakpoint({ name: 'xl' })}
	{:else if media.lg}
		{@render breakpoint({ name: 'lg' })}
	{:else if media.md}
		{@render breakpoint({ name: 'md' })}
	{:else if media.sm}
		{@render breakpoint({ name: 'sm' })}
	{:else}
		{@render breakpoint({ name: '-' })}
	{/if}
	<span class="text-muted-foreground text-center text-xs">
		Resize the window to see the breakpoint change.
	</span>
</div>

{#snippet breakpoint({ name }: { name: string })}
	<span in:scale={{ duration: 300 }} class="text-xl">
		{name}
	</span>
{/snippet}
