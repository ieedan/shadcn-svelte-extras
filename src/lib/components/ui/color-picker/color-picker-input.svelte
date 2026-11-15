<script lang="ts" module>
	import type { ColorPickerDraftInputBaseProps } from './color-picker-draft-input.svelte';

	export type ColorPickerInputProps = ColorPickerDraftInputBaseProps;
</script>

<script lang="ts">
	import { useColorPickerInput } from './color-picker.svelte.js';
	import ColorPickerDraftInput from './color-picker-draft-input.svelte';

	let { ref = $bindable(null), ...rest }: ColorPickerInputProps = $props();

	const input = useColorPickerInput();
</script>

<ColorPickerDraftInput
	bind:ref
	{input}
	data-slot="color-picker-input"
	aria-label="Color value"
	{...rest}
/>
