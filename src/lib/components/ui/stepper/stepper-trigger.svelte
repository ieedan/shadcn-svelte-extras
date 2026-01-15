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
	class={cn(
		'bg-primary text-primary-foreground z-10 flex size-7 items-center justify-center rounded-full ring-3 transition-colors',
		'data-[state=inactive]:text-muted-foreground data-[state=inactive]:bg-muted ring-background ',
		'focus-visible:ring-ring ring-offset-background ring-offset-2 focus-visible:ring-3',
		className
	)}
	{...triggerState.props}
	{...restProps}
>
	{@render children?.()}
</button>
