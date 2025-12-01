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
		'text-muted-foreground relative inline-flex h-9 w-fit items-center justify-center border-b border-border',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</TabsPrimitive.List>
