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
		'text-muted-foreground border-border relative inline-flex h-9 w-full max-w-full items-center justify-start overflow-x-auto border-b',
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
