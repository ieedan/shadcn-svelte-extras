---
title: 'Color Picker'
description: 'A composable color picker component.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

## Basic

The `<ColorPicker/>` component is built from small parts so you only render what you need. The sliders build on top of the [bits-ui](https://bits-ui.com) `<Slider/>` component.

<Demo demo="color-picker" />

## Installation

<Add item="color-picker" />

## Usage

```svelte
<script lang="ts">
	import * as ColorPicker from '$lib/components/ui/color-picker';

	let value = $state('#3b82f6');
</script>

<ColorPicker.Root bind:value>
	<ColorPicker.Area />
	<ColorPicker.HueSlider />
	<ColorPicker.AlphaSlider />
	<ColorPicker.Input />
</ColorPicker.Root>
```

## Composition

Use the following composition to build a `ColorPicker`:

```text
ColorPicker.Root
└── ColorPicker.Popover
    ├── ColorPicker.Trigger
    └── ColorPicker.Content
        ├── ColorPicker.Area
        ├── ColorPicker.HueSlider
        ├── ColorPicker.AlphaSlider
        ├── ColorPicker.FormatSelect
        └── ButtonGroup.Root
            ├── ColorPicker.Input (or ColorPicker.ChannelInputs)
            └── ColorPicker.AlphaInput
```

`Popover`, `Trigger` and `Content` are optional. Leave them out to render the picker inline. `FormatSelect`, `ChannelInputs` and `AlphaInput` are optional too.

## Popover

Wrap the parts in `<ColorPicker.Content/>`, add a `<ColorPicker.Trigger/>` and put both inside `<ColorPicker.Popover/>`.

This example also adds a `<ColorPicker.FormatSelect/>` and joins `<ColorPicker.ChannelInputs/>` and `<ColorPicker.AlphaInput/>` into one row with the [Button Group](https://shadcn-svelte.com/docs/components/button-group) component. `ChannelInputs` shows one field per channel for rgb, hsl and hsb, and a single text input for hex. The `grid-cols-4` class gives every number field the same width, and in a grid the hex input spans the three channel columns on its own.

While an `AlphaInput` is shown, the hex input leaves the alpha out. Typing a color without an alpha (e.g. `#ff0000`) keeps the current alpha; typing one with an alpha (e.g. `#ff000080`) sets it.

<Demo demo="color-picker-popover" />

## Formats

`value` accepts hex, `rgb()`, `hsl()` or `hsb()` and is written back in the chosen `format`. `format` is bindable, so a `<ColorPicker.FormatSelect/>` can change it. Pass `formats` to the select to offer fewer options.

`hsb()` isn't a CSS color, so browsers ignore it in a `style`. Use `hex`, `rgb` or `hsl` when you put `value` straight into CSS.

<Demo demo="color-picker-formats" />

## Disabled

<Demo demo="color-picker-disabled" />

## Translating labels

Every part has an English label that screen readers announce. Override them to translate. This example uses French:

```svelte
<script lang="ts">
	import * as ColorPicker from '$lib/components/ui/color-picker';
	import type { ColorChannel } from '$lib/components/ui/color-picker';

	const channelLabels: Record<ColorChannel, string> = {
		red: 'Rouge', // Red
		green: 'Vert', // Green
		blue: 'Bleu', // Blue
		hue: 'Teinte', // Hue
		saturation: 'Saturation', // Saturation
		lightness: 'Luminosité', // Lightness
		brightness: 'Luminosité' // Brightness
	};
</script>

<ColorPicker.Trigger aria-label="Choisir une couleur" />
<ColorPicker.Area
	aria-label="Saturation et luminosité"
	saturationLabel="Saturation"
	brightnessLabel="Luminosité"
	getValueText={(s, b) => `Saturation ${s} %, luminosité ${b} %`}
/>
<ColorPicker.HueSlider thumbLabel="Teinte" />
<ColorPicker.AlphaSlider thumbLabel="Opacité" />
<ColorPicker.FormatSelect aria-label="Format de couleur" />
<ColorPicker.Input aria-label="Valeur de la couleur" />
<ColorPicker.ChannelInputs getLabel={(channel) => channelLabels[channel]} />
<ColorPicker.AlphaInput aria-label="Opacité" />
```

<ApiReference />
