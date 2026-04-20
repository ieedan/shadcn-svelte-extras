import * as api from '../api-reference';
import type { SplitButtonPropsWithoutHTML } from '$lib/components/ui/split-button/split-button.svelte';

const Root = api.createComponentReference<SplitButtonPropsWithoutHTML>({
	description:
		'A control that combines a primary action with a secondary action (for example, a main button and a menu trigger).',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the root element.',
			bindable: true,
			type: 'HTMLDivElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'Content for the split button (primary action, separator, menu trigger, etc.).',
			type: 'Snippet'
		})
	}
});

export const reference = {
	name: 'SplitButton' as const,
	components: {
		Root
	}
};
