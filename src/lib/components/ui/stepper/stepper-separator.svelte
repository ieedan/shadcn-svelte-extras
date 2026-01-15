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
		'bg-muted data-[state=completed]:bg-primary h-1 transition-colors',
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
