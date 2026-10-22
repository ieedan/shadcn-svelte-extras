<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: TabsPrimitive.ListProps = $props();
</script>

<TabsPrimitive.List
	bind:ref
	data-slot="underline-tabs-list"
	class={cn(
		// overflow-x-auto makes overflow-y auto too, so the bottom rule is an inset shadow
		// (not a border) to keep the active underline inside the padding box.
		'text-muted-foreground relative inline-flex h-9 w-full max-w-full items-center justify-start overflow-x-auto overflow-y-hidden shadow-[inset_0_-1px_0_0_var(--color-border)]',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</TabsPrimitive.List>

<style>
	:global([data-slot='underline-tabs-list']) {
		-ms-overflow-style: none; /* IE and Edge */
		scrollbar-width: none; /* Firefox */
	}

	:global([data-slot='underline-tabs-list']::-webkit-scrollbar) {
		display: none;
	}
</style>
