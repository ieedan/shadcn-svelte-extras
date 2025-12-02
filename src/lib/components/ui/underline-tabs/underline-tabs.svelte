<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { useUnderlineTabs } from './underline-tabs.svelte.js';
	import { box } from 'svelte-toolbelt';

	let {
		ref = $bindable(null),
		value = $bindable(''),
		class: className,
		...restProps
	}: Omit<TabsPrimitive.RootProps, 'orientation'> = $props();

	useUnderlineTabs({
		value: box.with(
			() => value,
			(v) => (value = v)
		)
	});
</script>

<TabsPrimitive.Root
	bind:ref
	bind:value
	orientation="horizontal"
	data-slot="underline-tabs"
	class={cn('flex flex-col gap-2', className)}
	{...restProps}
/>
