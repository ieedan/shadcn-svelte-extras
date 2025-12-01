<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { IsMounted } from 'runed';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: TabsPrimitive.TriggerProps = $props();

	const isMounted = new IsMounted();
</script>

<TabsPrimitive.Trigger
	bind:ref
	data-slot="underline-tabs-trigger"
	class={cn(
		"dark:data-[state=active]:text-foreground focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground dark:text-muted-foreground data-[state=active]:border-primary inline-flex flex-1 items-center h-full justify-center gap-1.5 border-b-2 border-transparent px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...restProps}
/>
