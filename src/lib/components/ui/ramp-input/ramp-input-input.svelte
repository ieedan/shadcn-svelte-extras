<script lang="ts">
	import { cn } from '$lib/utils/utils.js';
	import { useRampInputInput } from './ramp-input.svelte.js';
	import type { RampInputInputProps } from './types.js';

	const inputState = useRampInputInput();

	let { class: className, ...rest }: RampInputInputProps = $props();
</script>

<input
	type="number"
	class={cn('h-9 px-4 text-center', className)}
	bind:value={inputState.rootState.opts.value.current}
	min={inputState.rootState.opts.min?.current}
	max={inputState.rootState.opts.max?.current}
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
