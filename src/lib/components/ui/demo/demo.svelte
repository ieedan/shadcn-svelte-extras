<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { cn } from '$lib/utils';
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import { useDemo, type TabValue } from './demo.svelte.js';
	import { box } from 'svelte-toolbelt';

	type RootProps = { value?: TabValue };

	let {
		value = $bindable('preview'),
		ref = $bindable(null),
		class: className,
		children,
		...rest
	}: Omit<TabsPrimitive.RootProps, 'value'> & RootProps = $props();

	useDemo({
		value: box.with(
			() => value,
			(v) => (value = v)
		)
	});
</script>

<Tabs.Root data-slot="demo" bind:ref bind:value class={cn(className)} {...rest}>
	{@render children?.()}
</Tabs.Root>
