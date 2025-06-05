import * as api from '../api-reference';
import type { SnippetProps } from '$lib/components/ui/snippet/snippet.svelte';

const Root = api.createComponentReference<SnippetProps>({
	name: 'Root',
	description: 'The root component for displaying a code snippet with copy functionality.',
	props: {
		variant: api.createStringUnionProp({
			type: '"default" | "secondary" | "destructive" | "primary"',
			description: 'The visual style of the snippet.',
			defaultValue: 'default'
		}),
		text: api.createAnyProp({
			description: 'The code or lines of code to display.',
			type: 'string | string[]'
		}),
		class: api.createStringProp({
			description: 'Additional classes to apply to the root element.'
		}),
		onCopy: api.createFunctionProp({
			description: 'Function called after the snippet is copied.',
			type: '(status: "success" | "failure") => void'
		})
	}
});

export const components = {
	Root
};
