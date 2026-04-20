import * as api from '../api-reference';
import type { SplitButtonPropsWithoutHTML } from '$lib/components/ui/split-button/split-button.svelte';
import type { SplitButtonActionProps } from '$lib/components/ui/split-button/split-button-action.svelte';
import type { SplitButtonSelectProps } from '$lib/components/ui/split-button/split-button-select.svelte';
import type { SplitButtonSelectActionProps } from '$lib/components/ui/split-button/split-button-select-action.svelte';

const Root = api.createComponentReference<SplitButtonPropsWithoutHTML>({
	name: 'Root',
	description: 'Allow users to select which action to perform from a list of options.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the root element.',
			bindable: true,
			type: 'HTMLElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'Content for the split button (primary action, separator, menu trigger, etc.).',
			type: 'Snippet'
		}),
		orientation: api.createStringUnionProp({
			type: '"horizontal" | "vertical"',
			description: 'Layout direction (same as Button Group).',
			defaultValue: 'horizontal'
		}),
		value: api.createStringProp({
			description:
				'The currently selected action value. Matches a child `Action`/`SelectAction` value.',
			bindable: true
		}),
		disabled: api.createBooleanProp({
			description: 'Disables both the visible action and the dropdown trigger.',
			defaultValue: false
		}),
		onclick: api.createFunctionProp({
			description:
				'Fired when the visible action is clicked. Receives `{ action, originalEvent }`.',
			type: '(event: { action: string; originalEvent: MouseEvent }) => void'
		}),
		onClickPromise: api.createFunctionProp({
			description:
				'Fired alongside `onclick`. While the returned promise is pending, the action shows a loading state and both the action and dropdown trigger are disabled.',
			type: '(event: { action: string; originalEvent: MouseEvent }) => Promise<void>'
		}),
		onActionSelect: api.createFunctionProp({
			description: 'Fired when the selected action changes via the dropdown.',
			type: '(value: string) => void'
		})
	}
});

const Action = api.createComponentReference<
	Pick<SplitButtonActionProps, 'value' | 'children' | 'onclick'> & { ref?: HTMLElement | null }
>({
	name: 'Action',
	description:
		'A button action. Only the action whose `value` matches the currently selected value is rendered.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the underlying button element.',
			bindable: true,
			type: 'HTMLElement',
			defaultValue: 'null'
		}),
		value: api.createStringProp({
			description: 'The value that identifies this action.',
			required: true
		}),
		children: api.createAnyProp({
			description: 'The content of the action button.',
			type: 'Snippet'
		}),
		onclick: api.createFunctionProp({
			description: 'Fired when the action is clicked.',
			type: '(event: MouseEvent) => void'
		})
	}
});

const Select = api.createComponentReference<
	Pick<SplitButtonSelectProps, 'open'> & { children?: unknown }
>({
	name: 'Select',
	description: 'Wraps the dropdown primitive and binds its value to the split button root state.',
	props: {
		open: api.createBooleanProp({
			description: 'Whether the dropdown is open.',
			bindable: true,
			defaultValue: false
		}),
		children: api.createAnyProp({
			description: 'The dropdown trigger and content.',
			type: 'Snippet'
		})
	}
});

const SelectTrigger = api.createComponentReference<{
	ref?: HTMLElement | null;
	children?: unknown;
}>({
	name: 'SelectTrigger',
	description: 'The button that opens the dropdown of available actions.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the trigger element.',
			bindable: true,
			type: 'HTMLElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'Optional trigger content. Defaults to a chevron icon.',
			type: 'Snippet'
		})
	}
});

const SelectContent = api.createComponentReference<{
	ref?: HTMLElement | null;
	children?: unknown;
}>({
	name: 'SelectContent',
	description: 'The floating container that holds the dropdown actions.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the content element.',
			bindable: true,
			type: 'HTMLElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The list of `SelectAction` items.',
			type: 'Snippet'
		})
	}
});

const SelectAction = api.createComponentReference<
	Pick<SplitButtonSelectActionProps, 'value'> & { children?: unknown }
>({
	name: 'SelectAction',
	description: 'An option in the dropdown. Selecting it updates the active action.',
	props: {
		value: api.createStringProp({
			description: 'The value that identifies this action.',
			required: true
		}),
		children: api.createAnyProp({
			description: 'The content of the dropdown option.',
			type: 'Snippet'
		})
	}
});

export const reference = {
	name: 'SplitButton' as const,
	components: {
		Root,
		Action,
		Select,
		SelectTrigger,
		SelectContent,
		SelectAction
	}
};
