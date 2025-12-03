<script lang="ts">
	import { Meter as MeterPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		max = 100,
		value,
		...restProps
	}: WithoutChildrenOrChild<MeterPrimitive.RootProps> = $props();
</script>

<MeterPrimitive.Root
	bind:ref
	{max}
	{value}
	class={cn(
		'relative h-2 w-full overflow-hidden rounded-full bg-(--meter-background)/20 [--meter-background:var(--primary)]',
		className
	)}
	{...restProps}
>
	<div
		class="h-full w-full flex-1 bg-(--meter-background) transition-[color,transform]"
		style={`transform: translateX(-${100 - (100 * (value ?? 0)) / (max ?? 1)}%)`}
	></div>
</MeterPrimitive.Root>
