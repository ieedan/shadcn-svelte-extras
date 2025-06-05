import * as api from '../api-reference';
import type {
	CodeRootPropsWithoutHTML,
	CodeCopyButtonPropsWithoutHTML
} from '$lib/components/ui/code/types';

const Root = api.createComponentReference<CodeRootPropsWithoutHTML>({
	name: 'Root',
	description: 'The root code block component for syntax highlighting.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the code block element.',
			bindable: true,
			type: 'HTMLElement',
			tooltip: 'HTMLDivElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'The content rendered below the code block.',
			type: 'Snippet'
		}),
		variant: api.createStringUnionProp({
			type: '"default" | "secondary"',
			description: 'The visual style of the code block.',
			defaultValue: 'default'
		}),
		lang: api.createStringUnionProp({
			type: '"bash" | "diff" | "javascript" | "json" | "svelte" | "typescript"',
			description: 'The language for syntax highlighting.',
			defaultValue: 'typescript'
		}),
		code: api.createStringProp({
			description: 'The code to display and highlight.',
			required: true
		}),
		class: api.createStringProp({
			description: 'Additional classes to apply to the code block.'
		}),
		hideLines: api.createBooleanProp({
			description: 'Whether to hide line numbers.',
			defaultValue: false
		}),
		highlight: api.createAnyProp({
			description: 'Lines or ranges to highlight, e.g. [2, [4,6]].',
			type: 'number | [number, number][]',
			defaultValue: '[]'
		})
	}
});

const CopyButton = api.createComponentReference<CodeCopyButtonPropsWithoutHTML>({
	name: 'CopyButton',
	description: 'A button to copy the code block content.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the copy button element.',
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
		icon: api.createAnyProp({
			description: 'Custom icon to display in the button.',
			type: 'Snippet'
		}),
		animationDuration: api.createNumberProp({
			description: 'Duration of the copy animation in ms.'
		}),
		onCopy: api.createFunctionProp({
			description: 'Callback when copy is triggered.',
			type: '(status: UseClipboard["status"]) => void'
		}),
		children: api.createAnyProp({
			description: 'Slot content for the copy button (e.g., custom label or icon).',
			type: 'Snippet'
		})
	}
});

export const components = {
	Root,
	CopyButton
};
