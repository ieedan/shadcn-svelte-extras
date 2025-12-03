import * as api from '../api-reference';

const Root = api.createComponentReference({
	name: 'Root',
	description: 'The root component of the ramp input. Manages the value state and ramp behavior.',
	props: {
		value: api.createNumberProp({
			description: 'The current value of the input.',
			bindable: true,
			defaultValue: '0'
		}),
		rampBy: api.createNumberProp({
			description: 'The amount to increment or decrement the value by.',
			defaultValue: '1'
		}),
		min: api.createNumberProp({
			description: 'The minimum value allowed.'
		}),
		max: api.createNumberProp({
			description: 'The maximum value allowed.'
		}),
		rampSettings: api.createAnyProp({
			description: 'Configuration options for the ramp behavior when holding down increment/decrement buttons.',
			type: 'object',
			tooltip: '{ startDelay?: number; rampUpTime?: number; minFrequency?: number; maxFrequency?: number }',
			defaultValue: '{ startDelay: 400, rampUpTime: 0, minFrequency: 35, maxFrequency: 35 }'
		}),
		children: api.createAnyProp({
			description: 'The child components of the ramp input.',
			type: 'Snippet'
		})
	}
});

const Group = api.createComponentReference({
	name: 'Group',
	description: 'A container component that groups the input and buttons together with proper styling.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the group container element.',
			bindable: true,
			type: 'HTMLDivElement',
			defaultValue: 'null'
		}),
		class: api.createStringProp({
			description: 'Additional CSS classes to apply to the group container.'
		}),
		children: api.createAnyProp({
			description: 'The child components of the group (typically Input, Increment, and Decrement).',
			type: 'Snippet'
		})
	}
});

const Input = api.createComponentReference({
	name: 'Input',
	description: 'The input element that displays and allows editing of the value.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the input element.',
			bindable: true,
			type: 'HTMLInputElement',
			defaultValue: 'null'
		}),
		class: api.createStringProp({
			description: 'Additional CSS classes to apply to the input element.'
		})
	}
});

const Increment = api.createComponentReference({
	name: 'Increment',
	description: 'A button that increments the value. Supports ramp behavior when held down.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the button element.',
			bindable: true,
			type: 'HTMLElement',
			tooltip: 'HTMLButtonElement',
			defaultValue: 'null'
		}),
		variant: api.createStringUnionProp({
			type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
			description: 'The visual style of the button.',
			defaultValue: 'ghost'
		}),
		size: api.createStringUnionProp({
			type: '"default" | "sm" | "lg" | "icon"',
			description: 'The size of the button.',
			defaultValue: 'icon'
		}),
		class: api.createStringProp({
			description: 'Additional CSS classes to apply to the button.'
		}),
		children: api.createAnyProp({
			description: 'The content of the button. Defaults to a plus icon if not provided.',
			type: 'Snippet'
		}),
		disabled: api.createBooleanProp({
			description: 'Whether the button is disabled.',
			defaultValue: 'false'
		}),
		onpointerdown: api.createFunctionProp({
			description: 'Handler for the pointerdown event.',
			type: '(e: PointerEvent) => void'
		}),
		onpointerup: api.createFunctionProp({
			description: 'Handler for the pointerup event.',
			type: '(e: PointerEvent) => void'
		}),
		onclick: api.createFunctionProp({
			description: 'Handler for the click event.',
			type: '(e: MouseEvent) => void'
		})
	}
});

const Decrement = api.createComponentReference({
	name: 'Decrement',
	description: 'A button that decrements the value. Supports ramp behavior when held down.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the button element.',
			bindable: true,
			type: 'HTMLElement',
			tooltip: 'HTMLButtonElement',
			defaultValue: 'null'
		}),
		variant: api.createStringUnionProp({
			type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
			description: 'The visual style of the button.',
			defaultValue: 'ghost'
		}),
		size: api.createStringUnionProp({
			type: '"default" | "sm" | "lg" | "icon"',
			description: 'The size of the button.',
			defaultValue: 'icon'
		}),
		class: api.createStringProp({
			description: 'Additional CSS classes to apply to the button.'
		}),
		children: api.createAnyProp({
			description: 'The content of the button. Defaults to a minus icon if not provided.',
			type: 'Snippet'
		}),
		disabled: api.createBooleanProp({
			description: 'Whether the button is disabled.',
			defaultValue: 'false'
		}),
		onpointerdown: api.createFunctionProp({
			description: 'Handler for the pointerdown event.',
			type: '(e: PointerEvent) => void'
		}),
		onpointerup: api.createFunctionProp({
			description: 'Handler for the pointerup event.',
			type: '(e: PointerEvent) => void'
		}),
		onclick: api.createFunctionProp({
			description: 'Handler for the click event.',
			type: '(e: MouseEvent) => void'
		})
	}
});

export const reference = {
	name: 'RampInput' as const,
	components: {
		Root,
		Group,
		Input,
		Increment,
		Decrement
	}
};

