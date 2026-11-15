<script lang="ts" module>
	import type { ColorPickerDraftInputBaseProps } from './color-picker-draft-input.svelte';
	import type { ChannelFormat } from './color.js';

	export type ColorPickerChannelInputProps = ColorPickerDraftInputBaseProps & {
		format: ChannelFormat;
		/** The channel's position in the format, e.g. `1` is green for rgb. */
		index: number;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { box } from 'svelte-toolbelt';
	import { useColorPickerChannelInput } from './color-picker.svelte.js';
	import ColorPickerDraftInput from './color-picker-draft-input.svelte';

	let {
		ref = $bindable(null),
		format,
		index,
		class: className,
		...rest
	}: ColorPickerChannelInputProps = $props();

	const input = useColorPickerChannelInput({
		format: box.with(() => format),
		index: box.with(() => index)
	});
</script>

<ColorPickerDraftInput
	bind:ref
	{input}
	inputmode="numeric"
	data-slot="color-picker-channel-input"
	class={cn('min-w-0 px-2 text-center', className)}
	{...rest}
/>
