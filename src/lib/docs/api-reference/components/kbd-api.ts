import * as api from '../api-reference';
import type { KbdPropsWithoutHTML } from '$lib/components/ui/kbd/kbd.svelte';

const Root = api.createComponentReference<KbdPropsWithoutHTML>({
	description: 'The root keyboard key component.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the kbd element.',
			bindable: true,
			type: 'HTMLElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The content of the keyboard key.',
			type: 'Snippet'
		}),
		class: api.createStringProp({
			description: 'Additional classes to apply to the kbd element.'
		}),
		size: api.createStringUnionProp({
			type: '"sm" | "default" | "lg"',
			description: 'The size of the keyboard key.',
			defaultValue: 'default'
		}),
		variant: api.createStringUnionProp({
			type: '"outline" | "secondary" | "primary"',
			description: 'The visual style of the keyboard key.',
			defaultValue: 'outline'
		})
	}
});

export const components = {
	Root
};
