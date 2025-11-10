<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import ArrowDownIcon from '@lucide/svelte/icons/arrow-down';
	import { scale } from 'svelte/transition';
	import { UseAutoScroll } from '$lib/hooks/use-auto-scroll.svelte.js';
	import type { ChatListProps } from './types';

	let { ref = $bindable(null), children, class: className, ...rest }: ChatListProps = $props();

	// Prevents movement on page load
	let canScrollSmooth = $state(false);

	const autoScroll = new UseAutoScroll();

	onMount(() => {
		canScrollSmooth = true;
	});
</script>

<div class="relative">
	<div
		{...rest}
		bind:this={ref}
		class={cn('no-scrollbar flex h-full w-full flex-col gap-4 overflow-y-auto p-4', className, {
			'scroll-smooth': canScrollSmooth
		})}
		bind:this={autoScroll.ref}
	>
		{@render children?.()}
	</div>
	{#if !autoScroll.isAtBottom}
		<div
			in:scale={{ start: 0.85, duration: 100, delay: 250 }}
			out:scale={{ start: 0.85, duration: 100 }}
		>
			<Button
				onclick={() => autoScroll.scrollToBottom()}
				variant="outline"
				size="icon"
				class="absolute bottom-2 left-1/2 inline-flex -translate-x-1/2 transform rounded-full shadow-md"
			>
				<ArrowDownIcon />
			</Button>
		</div>
	{/if}
</div>
