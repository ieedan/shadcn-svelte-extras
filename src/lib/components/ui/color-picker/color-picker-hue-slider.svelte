<script lang="ts" module>
	import type { SliderSingleRootProps } from 'bits-ui';
	import type { WithElementRef, WithoutChildrenOrChild } from '$lib/utils.js';

	export type ColorPickerHueSliderProps = WithElementRef<
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

	let {
		ref = $bindable(null),
		class: className,
		thumbLabel = 'Hue',
		...rest
	}: ColorPickerHueSliderProps = $props();

	const root = useColorPickerRootCtx();
</script>

<Slider.Root
	bind:ref
	type="single"
	bind:value={root.hue}
	min={0}
	max={360}
	step={1}
	disabled={root.disabled}
	data-slot="color-picker-hue-slider"
	class={cn(
		'relative flex h-3 w-full touch-none items-center rounded-full select-none data-disabled:cursor-not-allowed',
		className
	)}
	style="background: linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)"
	{...rest}
>
	<Slider.Thumb
		index={0}
		aria-label={thumbLabel}
		data-slot="color-picker-hue-slider-thumb"
		class="focus-visible:ring-ring/50 block size-4 rounded-full border-2 border-white shadow-md ring-1 ring-black/10 outline-hidden transition-[box-shadow] focus-visible:ring-[3px]"
		style="background-color: {root.hueColor}"
	/>
</Slider.Root>
