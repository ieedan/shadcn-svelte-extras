import * as api from '../api-reference';
import type {
	ColorPickerChannelInputsProps,
	ColorPickerPropsWithoutHTML
} from '$lib/components/ui/color-picker';

function createRefProp(element: string) {
	return api.createAnyProp({
		description: `A reference to the underlying ${element} element.`,
		bindable: true,
		type: element,
		defaultValue: 'null'
	});
}

function createClassProp() {
	return api.createStringProp({
		description: 'Additional classes to apply.'
	});
}

function createThumbLabelProp(defaultValue: string) {
	return api.createStringProp({
		description: 'Accessible label for the thumb. Override it to translate.',
		defaultValue
	});
}

const Root = api.createComponentReference<ColorPickerPropsWithoutHTML>({
	name: 'Root',
	description: 'Holds the color state and provides it to the other parts.',
	props: {
		ref: createRefProp('HTMLDivElement'),
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
		}),
		children: api.createAnyProp({
			description: 'The picker parts.',
			type: 'Snippet'
		})
	}
});

const Area = api.createComponentReference({
	name: 'Area',
	description:
		'The saturation and brightness square. Screen readers get one slider per axis. Arrow keys move by 1 (Shift by 10), Home/End set saturation, PageUp/PageDown change brightness by 10.',
	props: {
		ref: createRefProp('HTMLDivElement'),
		class: createClassProp(),
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
	description: 'A slider for the hue, from 0 to 360.',
	props: {
		ref: createRefProp('HTMLSpanElement'),
		class: createClassProp(),
		thumbLabel: createThumbLabelProp('Hue')
	}
});

const AlphaSlider = api.createComponentReference({
	name: 'AlphaSlider',
	description: 'A slider for the transparency, from 0 to 100%.',
	props: {
		ref: createRefProp('HTMLSpanElement'),
		class: createClassProp(),
		thumbLabel: createThumbLabelProp('Alpha')
	}
});

const Input = api.createComponentReference({
	name: 'Input',
	description:
		'A text input for the color. Applies on Enter or blur, reverts invalid values and cancels on Escape. While an `AlphaInput` is shown it leaves the alpha out, and a typed color without an alpha keeps the current one.',
	props: {
		ref: createRefProp('HTMLInputElement'),
		class: createClassProp()
	}
});

const FormatSelect = api.createComponentReference({
	name: 'FormatSelect',
	description: 'A select that changes the bound `format` of the root (HEX, RGB, HSL or HSB).',
	props: {
		ref: createRefProp('HTMLButtonElement'),
		class: createClassProp(),
		formats: api.createAnyProp({
			type: 'ColorFormat[]',
			description: 'The formats to offer, in order.',
			defaultValue: "['hex', 'rgb', 'hsl', 'hsb']"
		})
	}
});

const AlphaInput = api.createComponentReference({
	name: 'AlphaInput',
	description:
		'A text input for the transparency as a percentage. Arrow keys change it by 1 (Shift by 10). Applies on Enter or blur, reverts invalid values and cancels on Escape.',
	props: {
		ref: createRefProp('HTMLInputElement'),
		class: createClassProp()
	}
});

const ChannelInputs = api.createComponentReference<ColorPickerChannelInputsProps>({
	name: 'ChannelInputs',
	description:
		'One number input per channel of the current format (e.g. red, green and blue for rgb), or a single `Input` for hex. Renders no wrapper, so the inputs can be joined with a Button Group.',
	props: {
		class: api.createStringProp({
			description: 'Additional classes to apply to each input.'
		}),
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
		Area,
		HueSlider,
		AlphaSlider,
		Input,
		FormatSelect,
		AlphaInput,
		ChannelInputs
	}
};
