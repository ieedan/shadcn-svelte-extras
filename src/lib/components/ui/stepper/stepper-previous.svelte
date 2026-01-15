<script lang="ts">
	import { box, mergeProps } from 'svelte-toolbelt';
	import { useStepperStepButton } from './stepper.svelte.js';
	import type { StepperPreviousButtonProps } from './types';
	import { Button } from '../button';

	let {
		disabled = false,
		child,
		children,
		variant = 'outline',
		size = 'default',
		...rest
	}: StepperPreviousButtonProps = $props();

	const buttonState = useStepperStepButton({
		type: box.with(() => 'previous'),
		disabled: box.with(() => disabled)
	});

	const mergedProps = $derived(mergeProps(buttonState.props, rest, { variant, size, 'data-slot': 'stepper-previous' }));
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<Button {...mergedProps}>
		{@render children?.()}
	</Button>
{/if}
