<script lang="ts">
	import LoadingDots from './loading-dots.svelte';
	import { cn } from '$lib/utils.js';
	import type { ChatBubbleMessageProps } from './types';

	let {
		ref = $bindable(null),
		typing = false,
		class: className,
		children,
		...rest
	}: ChatBubbleMessageProps = $props();
</script>

<div
	{...rest}
	bind:this={ref}
	class={cn(
		"bg-secondary group-data-[variant='sent']/chat-bubble:bg-primary group-data-[variant='sent']/chat-bubble:text-primary-foreground order-2 rounded-lg p-4 text-sm group-data-[variant='received']/chat-bubble:rounded-bl-none group-data-[variant='sent']/chat-bubble:order-1 group-data-[variant='sent']/chat-bubble:rounded-br-none",
		className
	)}
>
	{#if typing}
		<div class="flex size-full place-items-center justify-center">
			<LoadingDots />
		</div>
	{:else}
		{@render children?.()}
	{/if}
</div>
