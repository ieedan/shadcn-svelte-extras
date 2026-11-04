<script lang="ts" module>
	import type { SliderSingleRootProps } from 'bits-ui';
	import type { WithElementRef, WithoutChildrenOrChild } from '$lib/utils.js';

	export type ColorPickerAlphaSliderProps = WithElementRef<
		Omit<
			WithoutChildrenOrChild<SliderSingleRootProps>,
			'type' | 'value' | 'onValueChange' | 'min' | 'max' | 'orientation' | 'disabled'
		>
	> & {
		/** Accessible label for the thumb. Override it to translate. */
		thumbLabel?: string;
	};
</script>

<script lang="ts">
	import { Slider } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { useColorPickerRootCtx } from './color-picker.svelte.js';
	import { CHECKERBOARD } from './color.js';

	let {
		ref = $bindable(null),
		class: className,
		thumbLabel = 'Alpha',
		...rest
	}: ColorPickerAlphaSliderProps = $props();

	const root = useColorPickerRootCtx();
</script>

<Slider.Root
	bind:ref
	type="single"
	bind:value={root.alpha}
	min={0}
	max={100}
	step={1}
	disabled={root.disabled}
	data-slot="color-picker-alpha-slider"
	class={cn(
		'relative flex h-3 w-full touch-none items-center rounded-full select-none data-disabled:cursor-not-allowed',
		className
	)}
	style="background: linear-gradient(to right, transparent, {root.opaqueRgb}), {CHECKERBOARD}"
	{...rest}
>
	<Slider.Thumb
		index={0}
		aria-label={thumbLabel}
		data-slot="color-picker-alpha-slider-thumb"
		class="focus-visible:ring-ring/50 block size-4 rounded-full border-2 border-white shadow-md ring-1 ring-black/10 outline-hidden transition-[box-shadow] focus-visible:ring-[3px]"
		style="background: linear-gradient({root.rgb}, {root.rgb}), {CHECKERBOARD}"
	/>
</Slider.Root>
