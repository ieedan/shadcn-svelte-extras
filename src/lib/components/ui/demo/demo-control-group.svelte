<script lang="ts">
	import { cn } from '$lib/utils.js';
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import type { ComponentProps } from 'svelte';
	import { useDemoControlGroup } from './demo.svelte.js';
	import { box } from 'svelte-toolbelt';

	let {
		// this is just here to satisfy the types
		type = 'single',
		class: className,
		children,
		...rest
	}: Omit<ComponentProps<typeof ToggleGroup.Root>, 'type' | 'value' | 'onValueChange'> & {
		type?: 'single';
	} = $props();

	let value = $state(100);

	const controlGroupState = useDemoControlGroup({
		size: box.with(
			() => value,
			(v) => (value = v)
		)
	});
</script>

<ToggleGroup.Root
	{type}
	value={value.toString()}
	onValueChange={(value) => controlGroupState.onValueChange(parseInt(value))}
	class={cn('hidden h-9 gap-0.5 rounded-md border border-border p-0.5 md:flex', className)}
	{...rest}
>
	{@render children?.()}
</ToggleGroup.Root>
