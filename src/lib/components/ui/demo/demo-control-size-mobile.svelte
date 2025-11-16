<script lang="ts">
	import * as ToggleGroup from '$lib/components/ui/toggle-group';
	import SmartPhoneIcon from '@lucide/svelte/icons/smartphone';
	import type { ComponentProps } from 'svelte';
	import { cn } from '$lib/utils.js';
	import { controlVariants } from './index.js';

	let {
		ref = $bindable(null),
		value = 30,
		class: className,
		...rest
	}: Omit<ComponentProps<typeof ToggleGroup.Item>, 'value' | 'aria-label'> & {
		value?: number;
	} = $props();
</script>

<ToggleGroup.Item
	aria-label="Mobile"
	bind:ref
	value={value.toString()}
	class={cn(controlVariants(), className)}
	{...rest}
>
	<SmartPhoneIcon />
</ToggleGroup.Item>
