<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WithoutChildren } from 'bits-ui';
	import type { WithElementRef } from '$lib/utils.js';

	export type ColorPickerAreaProps = WithoutChildren<
		WithElementRef<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
	> & {
		/** Accessible label for the area. Override it to translate. */
		label?: string;
		/** Accessible label for the saturation input. Override it to translate. */
		saturationLabel?: string;
		/** Accessible label for the brightness input. Override it to translate. */
		brightnessLabel?: string;
		/** Text read by screen readers for the current position. Override it to translate. */
		getValueText?: (saturation: number, brightness: number) => string;
	};
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { useColorPickerArea } from './color-picker.svelte.js';

	let {
		ref = $bindable(null),
		class: className,
		label = 'Saturation and brightness',
		saturationLabel = 'Saturation',
		brightnessLabel = 'Brightness',
		getValueText = (saturation, brightness) =>
			`Saturation ${saturation}%, Brightness ${brightness}%`,
		onpointerdown,
		onpointermove,
		onkeydown,
		...rest
	}: ColorPickerAreaProps = $props();

	const area = useColorPickerArea();
	const valueText = $derived(getValueText(area.saturation, area.brightness));
</script>

<!--
	Two visually hidden range inputs give screen readers a slider per axis.
	Arrow keys still move in 2D from either one.
-->
<div
	bind:this={ref}
	data-slot="color-picker-area"
	role="group"
	aria-label={label}
	aria-disabled={area.root.disabled}
	class={cn(
		'has-[input:focus-visible]:ring-ring/50 relative h-40 w-full cursor-crosshair touch-none rounded-md select-none has-[input:focus-visible]:ring-[3px] aria-disabled:cursor-not-allowed',
		className
	)}
	style:background-color={area.root.hueColor}
	{...rest}
	onpointerdown={(e) => {
		onpointerdown?.(e);
		area.onpointerdown(e);
	}}
	onpointermove={(e) => {
		onpointermove?.(e);
		area.onpointermove(e);
	}}
	onkeydown={(e) => {
		onkeydown?.(e);
		area.onkeydown(e);
	}}
>
	<div class="absolute inset-0 rounded-md bg-linear-to-r from-white to-transparent"></div>
	<div class="absolute inset-0 rounded-md bg-linear-to-t from-black to-transparent"></div>
	<input
		type="range"
		class="sr-only"
		min={0}
		max={100}
		step={1}
		value={area.saturation}
		disabled={area.root.disabled}
		aria-label={saturationLabel}
		aria-valuetext={valueText}
		oninput={(e) => area.oninput(e, 's')}
	/>
	<input
		type="range"
		class="sr-only"
		min={0}
		max={100}
		step={1}
		value={area.brightness}
		disabled={area.root.disabled}
		aria-label={brightnessLabel}
		aria-orientation="vertical"
		aria-valuetext={valueText}
		oninput={(e) => area.oninput(e, 'v')}
	/>
	<div
		data-slot="color-picker-area-thumb"
		class="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md ring-1 ring-black/10"
		style:left="{area.root.hsva.s}%"
		style:top="{100 - area.root.hsva.v}%"
		style:background-color={area.root.rgb}
	></div>
</div>
