<script lang="ts">
	import { cn } from '#lib/utils.ts';
	import { useStepperNav } from './stepper.svelte.ts';
	import type { StepperNavProps } from './types.ts';
	import { box } from 'svelte-toolbelt';

	let {
		orientation = 'horizontal',
		class: className,
		children,
		...rest
	}: StepperNavProps = $props();

	const stepperNavState = useStepperNav({
		orientation: box.with(() => orientation)
	});
</script>

<div
	data-slot="stepper-nav"
	class={cn(
		'group/stepper-nav flex',
		{
			'flex-row justify-between': orientation === 'horizontal',
			'flex-col gap-2': orientation === 'vertical'
		},
		className
	)}
	{...stepperNavState.props}
	{...rest}
>
	{@render children?.()}
</div>
