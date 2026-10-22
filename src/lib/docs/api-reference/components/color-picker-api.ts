import * as api from '../api-reference';

const Root = api.createComponentReference({
	name: 'Root',
	description: 'Holds the color state and provides it to the other parts.',
	props: {
		value: api.createStringProp({
			description:
				'The current color. Accepts hex, rgb(), hsl() or hsb() and is always written back in the chosen `format`.',
			bindable: true,
			defaultValue: '#000000'
		}),
		format: api.createStringUnionProp({
			type: '"hex" | "rgb" | "hsl" | "hsb"',
			description: 'The format used when writing `value`.',
			bindable: true,
			defaultValue: 'hex'
		}),
		disabled: api.createBooleanProp({
			description: 'Prevents the color from being changed.',
			defaultValue: false
		})
	}
});

const Popover = api.createComponentReference({
	name: 'Popover',
	description: 'Shows the picker in a popover. Wrap `Trigger` and `Content` with it.',
	props: {
		open: api.createBooleanProp({
			description: 'Whether the popover is open.',
			bindable: true,
			defaultValue: false
		})
	},
	forwardTo: {
		name: 'bits-ui Popover.Root',
		href: 'https://bits-ui.com/docs/components/popover#root'
	}
});

const Trigger = api.createComponentReference({
	name: 'Trigger',
	description:
		'A swatch button that opens the popover. Pass children to replace the default swatch.',
	props: {},
	forwardTo: {
		name: 'bits-ui Popover.Trigger',
		href: 'https://bits-ui.com/docs/components/popover#trigger'
	}
});

const Content = api.createComponentReference({
	name: 'Content',
	description: 'The popover panel that holds the picker parts.',
	props: {
		align: api.createStringUnionProp({
			type: '"start" | "center" | "end"',
			description: 'How the content is aligned to the trigger.',
			defaultValue: 'start'
		})
	},
	forwardTo: {
		name: 'bits-ui Popover.Content',
		href: 'https://bits-ui.com/docs/components/popover#content'
	}
});

const Area = api.createComponentReference({
	name: 'Area',
	description:
		'The saturation and brightness square. Screen readers get one slider per axis. Arrow keys move by 1 (Shift by 10), Home/End set saturation, PageUp/PageDown change brightness by 10.',
	props: {
		label: api.createStringProp({
			description: 'Accessible label for the area. Override it to translate.',
			defaultValue: 'Saturation and brightness'
		}),
		saturationLabel: api.createStringProp({
			description: 'Accessible label for the saturation input. Override it to translate.',
			defaultValue: 'Saturation'
		}),
		brightnessLabel: api.createStringProp({
			description: 'Accessible label for the brightness input. Override it to translate.',
			defaultValue: 'Brightness'
		}),
		getValueText: api.createFunctionProp({
			description:
				'Text read by screen readers for the current position. Override it to translate.',
			type: '(saturation: number, brightness: number) => string'
		})
	}
});

const HueSlider = api.createComponentReference({
	name: 'HueSlider',
	description: 'A slider for the hue.',
	props: {
		thumbLabel: api.createStringProp({
			description: 'Accessible label for the thumb. Override it to translate.',
			defaultValue: 'Hue'
		})
	},
	forwardTo: {
		name: 'bits-ui Slider.Root',
		href: 'https://bits-ui.com/docs/components/slider#root'
	}
});

const AlphaSlider = api.createComponentReference({
	name: 'AlphaSlider',
	description: 'A slider for the transparency.',
	props: {
		thumbLabel: api.createStringProp({
			description: 'Accessible label for the thumb. Override it to translate.',
			defaultValue: 'Alpha'
		})
	},
	forwardTo: {
		name: 'bits-ui Slider.Root',
		href: 'https://bits-ui.com/docs/components/slider#root'
	}
});

const Input = api.createComponentReference({
	name: 'Input',
	description:
		'A text input for the color. Applies on Enter or blur, reverts invalid values and cancels on Escape. While an `AlphaInput` is shown it leaves the alpha out, and a typed color without an alpha keeps the current one.',
	props: {}
});

const FormatSelect = api.createComponentReference({
	name: 'FormatSelect',
	description: 'A select that changes the bound `format` of the root (HEX, RGB, HSL or HSB).',
	props: {
		formats: api.createAnyProp({
			type: 'ColorFormat[]',
			description: 'The formats to offer, in order.',
			defaultValue: "['hex', 'rgb', 'hsl', 'hsb']"
		})
	},
	forwardTo: {
		name: 'Select.Trigger',
		href: 'https://shadcn-svelte.com/docs/components/select'
	}
});

const AlphaInput = api.createComponentReference({
	name: 'AlphaInput',
	description:
		'A text input for the transparency as a percentage. Arrow keys change it by 1 (Shift by 10). Applies on Enter or blur, reverts invalid values and cancels on Escape.',
	props: {}
});

const ChannelInputs = api.createComponentReference({
	name: 'ChannelInputs',
	description:
		'One number input per channel of the current format (e.g. red, green and blue for rgb), or a single `Input` for hex. Renders no wrapper, so the inputs can be joined with a Button Group.',
	props: {
		getLabel: api.createFunctionProp({
			description: 'Accessible label for each channel input. Override it to translate.',
			type: '(channel: ColorChannel) => string'
		})
	}
});

export const reference = {
	name: 'ColorPicker' as const,
	components: {
		Root,
		Popover,
		Trigger,
		Content,
		Area,
		HueSlider,
		AlphaSlider,
		Input,
		FormatSelect,
		AlphaInput,
		ChannelInputs
	}
};
