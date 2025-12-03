<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { useRampInputInput } from './ramp-input.svelte.js';
	import type { RampInputInputProps } from './types.js';

	const inputState = useRampInputInput();

	let { class: className, ...rest }: RampInputInputProps = $props();
</script>

<input
	type="number"
	class={cn(
		'aria-invalid:border-destructive border-border h-9 rounded-md border px-4 text-center outline-none',
		className
	)}
	bind:value={inputState.rootState.opts.value.current}
	min={inputState.rootState.opts.min?.current}
	max={inputState.rootState.opts.max?.current}
	aria-invalid={!inputState.rootState.valid}
	oninput={(e) => {
		const value = e.currentTarget.value;

		if (
			inputState.rootState.opts.min?.current !== undefined &&
			Number(value) < inputState.rootState.opts.min.current
		) {
			inputState.rootState.opts.value.current = inputState.rootState.opts.min.current;
		}
		if (
			inputState.rootState.opts.max?.current !== undefined &&
			Number(value) > inputState.rootState.opts.max.current
		) {
			inputState.rootState.opts.value.current = inputState.rootState.opts.max.current;
		}
	}}
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
