import * as api from '../api-reference';
import type {
	StepperRootProps,
	StepperNavPropsWithoutHTML,
	StepperItemPropsWithoutHTML
} from '$lib/components/ui/stepper/types';

const Root = api.createComponentReference<StepperRootProps>({
	name: 'Root',
	description: 'The root component of the stepper. Manages the current step state.',
	props: {
		step: api.createNumberProp({
			description: 'The current active step number (1-indexed).',
			bindable: true,
			defaultValue: 1
		}),
		children: api.createAnyProp({
			description: 'The content of the stepper (usually Stepper.Nav).',
			type: 'Snippet'
		})
	}
});

const Nav = api.createComponentReference<StepperNavPropsWithoutHTML>({
	name: 'Nav',
	description: 'The navigation container for the stepper. Controls the orientation of the stepper.',
	props: {
		orientation: api.createStringUnionProp({
			type: '"horizontal" | "vertical"',
			description: 'The orientation of the stepper navigation.',
			defaultValue: 'horizontal'
		})
	}
});

const Item = api.createComponentReference<StepperItemPropsWithoutHTML>({
	name: 'Item',
	description: 'A single step item in the stepper. Each item represents one step in the process.',
	props: {
		id: api.createStringProp({
			description: 'A unique identifier for the step. Auto-generated if not provided.',
			required: false
		})
	}
});

const Trigger = api.createComponentReference({
	name: 'Trigger',
	description:
		'The clickable trigger button for a step. Allows users to navigate to a specific step.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the button element.',
			bindable: true,
			type: 'HTMLButtonElement',
			defaultValue: 'null'
		}),
		onclick: api.createFunctionProp({
			description:
				'An optional click handler that runs in addition to the default step selection behavior.',
			type: '(e: MouseEvent) => void'
		}),
		onkeydown: api.createFunctionProp({
			description:
				'An optional keyboard handler that runs in addition to the default keyboard navigation.',
			type: '(e: KeyboardEvent) => void'
		}),
		children: api.createAnyProp({
			description:
				'The content of the trigger (usually Stepper.Indicator, Stepper.Title, Stepper.Description).',
			type: 'Snippet'
		})
	}
});

const Indicator = api.createComponentReference({
	name: 'Indicator',
	description: 'The visual indicator for a step (usually displays the step number or an icon).',
	props: {
		children: api.createAnyProp({
			description: 'The content of the indicator (usually a number or icon).',
			type: 'Snippet'
		})
	}
});

const Separator = api.createComponentReference({
	name: 'Separator',
	description: 'The visual separator between steps. Automatically hidden for the last step.',
	props: {
		children: api.createAnyProp({
			description: 'Optional content for the separator.',
			type: 'Snippet'
		})
	}
});

const Title = api.createComponentReference({
	name: 'Title',
	description: 'The title text for a step.',
	props: {
		children: api.createAnyProp({
			description: 'The title content.',
			type: 'Snippet'
		})
	}
});

const Description = api.createComponentReference({
	name: 'Description',
	description: 'The description text for a step.',
	props: {
		children: api.createAnyProp({
			description: 'The description content.',
			type: 'Snippet'
		})
	}
});

const Next = api.createComponentReference({
	name: 'Next',
	description:
		'A button component that navigates to the next step. Automatically disabled when on the last step.',
	props: {
		disabled: api.createBooleanProp({
			description: 'Whether the button is disabled.',
			defaultValue: false
		}),
		variant: api.createStringUnionProp({
			type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
			description: 'The visual style of the button.',
			defaultValue: 'default'
		}),
		size: api.createStringUnionProp({
			type: '"default" | "sm" | "lg" | "icon"',
			description: 'The size of the button.',
			defaultValue: 'default'
		}),
		child: api.createAnyProp({
			description:
				'A custom component to render instead of the default Button. Receives merged props.',
			type: 'Snippet',
			tooltip: 'Snippet<[{ props: Record<string, unknown> }]>'
		}),
		children: api.createAnyProp({
			description: 'The content of the button.',
			type: 'Snippet'
		})
	}
});

const Previous = api.createComponentReference({
	name: 'Previous',
	description:
		'A button component that navigates to the previous step. Automatically disabled when on the first step.',
	props: {
		disabled: api.createBooleanProp({
			description: 'Whether the button is disabled.',
			defaultValue: false
		}),
		variant: api.createStringUnionProp({
			type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
			description: 'The visual style of the button.',
			defaultValue: 'outline'
		}),
		size: api.createStringUnionProp({
			type: '"default" | "sm" | "lg" | "icon"',
			description: 'The size of the button.',
			defaultValue: 'default'
		}),
		child: api.createAnyProp({
			description:
				'A custom component to render instead of the default Button. Receives merged props.',
			type: 'Snippet',
			tooltip: 'Snippet<[{ props: Record<string, unknown> }]>'
		}),
		children: api.createAnyProp({
			description: 'The content of the button.',
			type: 'Snippet'
		})
	}
});

export const reference = {
	name: 'Stepper' as const,
	components: {
		Root,
		Nav,
		Item,
		Trigger,
		Indicator,
		Separator,
		Title,
		Description,
		Next,
		Previous
	}
};
