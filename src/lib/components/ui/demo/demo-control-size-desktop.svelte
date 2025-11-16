<script lang="ts">
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import MonitorIcon from '@lucide/svelte/icons/monitor';
	import type { ComponentProps } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { controlVariants } from './index.js';

	let {
		ref = $bindable(null),
		value = 100,
		class: className,
		...rest
	}: Omit<ComponentProps<typeof ToggleGroup.Item>, 'value' | 'aria-label'> & {
		value?: number;
	} = $props();
</script>

<ToggleGroup.Item
	aria-label="Desktop"
	bind:ref
	value={value.toString()}
	class={cn(controlVariants(), className)}
	{...rest}
>
	<MonitorIcon />
</ToggleGroup.Item>
