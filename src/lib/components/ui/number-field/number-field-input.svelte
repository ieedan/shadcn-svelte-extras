<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { useNumberFieldInput } from './number-field.svelte.js';
	import type { NumberFieldInputProps } from './types.js';

	const inputState = useNumberFieldInput();

	let { ref = $bindable(null), class: className, ...rest }: NumberFieldInputProps = $props();
</script>

<input
	class={cn(
		'aria-invalid:border-destructive border-border flex-1 h-9 rounded-md border px-4 text-center outline-none',
		className
	)}
	bind:this={ref}
	data-slot="number-field-input"
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

