<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { useStepperItemTrigger } from './stepper.svelte.js';
	import { box, type WithElementRef } from 'svelte-toolbelt';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		onclick,
		onkeydown,
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLButtonAttributes, HTMLButtonElement> = $props();

	const triggerState = useStepperItemTrigger({
		ref: box.with(() => ref),
		onclick: box.with(() => onclick),
		onkeydown: box.with(() => onkeydown)
	});
</script>

<button
	bind:this={ref}
	data-slot="stepper-trigger"
	class={cn('group/stepper-trigger z-1', className)}
	{...triggerState.props}
	{...restProps}
>
	{@render children?.()}
</button>
