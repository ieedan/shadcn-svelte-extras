<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		value = $bindable(''),
		class: className,
		...restProps
	}: Omit<TabsPrimitive.RootProps, 'orientation'> = $props();
</script>

<TabsPrimitive.Root
	bind:ref
	bind:value
	orientation="horizontal"
	data-slot="underline-tabs"
	class={cn('flex flex-col gap-2', className)}
	{...restProps}
/>
