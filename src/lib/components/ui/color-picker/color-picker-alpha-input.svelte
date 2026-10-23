<script lang="ts" module>
	import type { ColorPickerDraftInputBaseProps } from './color-picker-draft-input.svelte';

	export type ColorPickerAlphaInputProps = ColorPickerDraftInputBaseProps;
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { useColorPickerAlphaInput } from './color-picker.svelte.js';
	import ColorPickerDraftInput from './color-picker-draft-input.svelte';

	let { ref = $bindable(null), class: className, ...rest }: ColorPickerAlphaInputProps = $props();

	const input = useColorPickerAlphaInput();
</script>

<ColorPickerDraftInput
	bind:ref
	{input}
	inputmode="numeric"
	data-slot="color-picker-alpha-input"
	aria-label="Alpha"
	class={cn('min-w-0 px-2 text-center', className)}
	{...rest}
/>
