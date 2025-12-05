import type { WindowPropsWithoutHTML } from '$lib/components/ui/window/window.svelte';
import * as api from '../api-reference';

const Root = api.createComponentReference<WindowPropsWithoutHTML>({
	name: 'Root',
	description: 'The root window component. Renders a styled window with optional children.',
	props: {
		contentClass: api.createStringProp({
			description: 'Classes applied to the content of the window.'
		}),
		children: api.createAnyProp({
			description: 'The content of the window.',
			type: 'Snippet'
		})
	}
});

export const reference = {
	name: 'Window' as const,
	components: {
		Root
	}
};
