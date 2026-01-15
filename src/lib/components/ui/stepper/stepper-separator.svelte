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
		'bg-muted data-[state=completed]:bg-primary absolute top-[12px] h-1 w-full shrink-0 transition-colors',
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
