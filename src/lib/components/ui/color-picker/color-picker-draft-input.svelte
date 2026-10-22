<script lang="ts" module>
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { WithElementRef } from '$lib/utils.js';
	import type { ColorPickerDraftState } from './color-picker.svelte.js';

	/** Props shared by the text inputs of the picker. */
	export type ColorPickerDraftInputBaseProps = WithElementRef<
		Omit<HTMLInputAttributes, 'type' | 'value' | 'files' | 'disabled'>,
		HTMLInputElement
	>;

	export type ColorPickerDraftInputProps = ColorPickerDraftInputBaseProps & {
		input: ColorPickerDraftState;
	};
</script>

<!--
	Internal: the `Input`, `AlphaInput` and channel inputs render through this,
	so they share the draft handling (apply on Enter or blur, cancel on Escape).
-->
<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { cn } from '$lib/utils.js';
	import { useColorPickerRootCtx } from './color-picker.svelte.js';

	let {
		ref = $bindable(null),
		input,
		class: className,
		oninput,
		onblur,
		onkeydown,
		...rest
	}: ColorPickerDraftInputProps = $props();

	const root = useColorPickerRootCtx();
</script>

<Input
	bind:ref
	type="text"
	spellcheck={false}
	autocomplete="off"
	value={input.draft}
	disabled={root.disabled}
	class={cn('h-8 font-mono text-xs', className)}
	{...rest}
	oninput={(e) => {
		oninput?.(e);
		input.oninput(e);
	}}
	onblur={(e) => {
		onblur?.(e);
		input.commit();
	}}
	onkeydown={(e) => {
		onkeydown?.(e);
		input.onkeydown(e);
	}}
/>
