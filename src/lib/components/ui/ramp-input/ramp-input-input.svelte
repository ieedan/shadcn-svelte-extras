<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { useRampInputInput } from './ramp-input.svelte.js';
	import type { RampInputInputProps } from './types.js';

	const inputState = useRampInputInput();

	let { ref = $bindable(null), class: className, ...rest }: RampInputInputProps = $props();
</script>

<input
	class={cn(
		'aria-invalid:border-destructive border-border h-9 rounded-md border px-4 text-center outline-none',
		className
	)}
	bind:this={ref}
	data-slot="ramp-input-input"
	bind:value={inputState.rootState.opts.value.current}
	{...inputState.props}
	{...rest}
/>

<style>
	input[type='number'] {
		appearance: none;
		-moz-appearance: textfield;
	}

	input[type='number']::-webkit-outer-spin-button,
	input[type='number']::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
