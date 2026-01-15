<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { useStepperSeparator } from './stepper.svelte.js';

	let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();

	const separatorState = useStepperSeparator();
</script>

<div
	data-slot="stepper-separator"
	class={cn(
		'bg-muted data-[state=completed]:bg-primary absolute shrink-0 transition-colors',
		'group-data-[orientation=horizontal]/stepper-nav:top-[12px] group-data-[orientation=horizontal]/stepper-nav:h-1 group-data-[orientation=horizontal]/stepper-nav:w-full',
		'group-data-[orientation=vertical]/stepper-nav:top-[28px] group-data-[orientation=vertical]/stepper-nav:left-[12px] group-data-[orientation=vertical]/stepper-nav:h-full group-data-[orientation=vertical]/stepper-nav:w-1',
		{
			hidden: separatorState.itemState.isLast
		},
		className
	)}
	{...separatorState.props}
	{...rest}
>
	{@render children?.()}
</div>
