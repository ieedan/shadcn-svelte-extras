<script lang="ts">
	import { box, mergeProps } from 'svelte-toolbelt';
	import { useStepperStepButton } from './stepper.svelte.ts';
	import type { StepperPreviousButtonProps } from './types.ts';
	import { Button } from '../button/index.ts';

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

	const mergedProps = $derived(
		mergeProps(buttonState.props, rest, { variant, size, 'data-slot': 'stepper-previous' })
	);
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<Button {...mergedProps}>
		{@render children?.()}
	</Button>
{/if}
