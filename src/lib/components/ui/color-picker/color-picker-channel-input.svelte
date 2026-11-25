<script lang="ts" module>
	import type { ColorPickerDraftInputBaseProps } from './color-picker-draft-input.svelte';
	import type { ChannelFormat } from './color.ts';

	export type ColorPickerChannelInputProps = ColorPickerDraftInputBaseProps & {
		format: ChannelFormat;
		/** The channel's position in the format, e.g. `1` is green for rgb. */
		index: number;
	};
</script>

<script lang="ts">
	import { cn } from '#lib/utils.ts';
	import { box } from 'svelte-toolbelt';
	import { useColorPickerChannelInput } from './color-picker.svelte.ts';
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
