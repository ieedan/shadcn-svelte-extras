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
├── ColorPicker.Area
├── ColorPicker.HueSlider
├── ColorPicker.AlphaSlider
├── ColorPicker.FormatSelect
└── ButtonGroup.Root
    ├── ColorPicker.Input (or ColorPicker.ChannelInputs)
    └── ColorPicker.AlphaInput
```

`FormatSelect`, `ChannelInputs` and `AlphaInput` are optional.

## Popover

Wrap a [Popover](https://shadcn-svelte.com/docs/components/popover) with `<ColorPicker.Root/>` and put the parts in `<Popover.Content/>`, so the picker keeps its state while the popover is closed. The trigger here paints its swatch from `value`, so the select leaves out `hsb`, which isn't a CSS color.

This example also adds a `<ColorPicker.FormatSelect/>` and joins `<ColorPicker.ChannelInputs/>` and `<ColorPicker.AlphaInput/>` into one row with the [Button Group](https://shadcn-svelte.com/docs/components/button-group) component. `ChannelInputs` shows one field per channel for rgb, hsl and hsb, and a single text input for hex. The `grid-cols-4` class gives every number field the same width, and in a grid the hex input spans the three channel columns on its own.

While an `AlphaInput` is shown, the hex input leaves the alpha out. Typing a color without an alpha (e.g. `#ff0000`) keeps the current alpha; typing one with an alpha (e.g. `#ff000080`) sets it.

<Demo demo="color-picker-popover" />

## Formats

`value` accepts hex, `rgb()`, `hsl()` or `hsb()` and is written back in the chosen `format`. `format` is bindable, so a `<ColorPicker.FormatSelect/>` can change it. Pass `formats` to the select to offer fewer options.

`hsb()` isn't a CSS color, so browsers ignore it in a `style`. Use `hex`, `rgb` or `hsl` when you put `value` straight into CSS.

<Demo demo="color-picker-formats" />

## Disabled

<Demo demo="color-picker-disabled" />

<ApiReference />
