import * as api from '../api-reference';
import type { ButtonPropsWithoutHTML } from '$lib/components/ui/button/types';

const Root = api.createComponentReference<ButtonPropsWithoutHTML>({
	description: 'The root button component.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the button element.',
			bindable: true,
			type: 'HTMLElement',
			tooltip: 'HTMLButtonElement | HTMLAnchorElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The content of the button.',
			type: 'Snippet'
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
		loading: api.createBooleanProp({
			description: 'Whether the button is in a loading state.'
		}),
		onClickPromise: api.createFunctionProp({
			description: 'A function to await while showing a loading state when the button is clicked.',
			type: '(e: MouseEvent) => Promise<void>'
		})
	}
});

export const reference = {
	name: 'Button' as const,
	components: {
		Root
	}
};
