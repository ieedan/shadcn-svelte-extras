<script lang="ts">
	import * as ToggleGroup from '#lib/components/ui/toggle-group/index.ts';
	import TabletIcon from '@lucide/svelte/icons/tablet';
	import type { ComponentProps } from 'svelte';
	import { cn } from '#lib/utils.ts';
	import { controlVariants } from './index.ts';

	let {
		ref = $bindable(null),
		value = 50,
		class: className,
		...rest
	}: Omit<ComponentProps<typeof ToggleGroup.Item>, 'value' | 'aria-label'> & {
		value?: number;
	} = $props();
</script>

<ToggleGroup.Item
	aria-label="Tablet"
	bind:ref
	value={value.toString()}
	class={cn(controlVariants(), className)}
	{...rest}
>
	<TabletIcon />
</ToggleGroup.Item>
