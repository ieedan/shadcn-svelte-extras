import * as api from '../api-reference';
import type { CopyButtonPropsWithoutHTML } from '$lib/components/ui/copy-button/types';

const Root = api.createComponentReference<CopyButtonPropsWithoutHTML>({
	description: 'A button that copies text to the clipboard and shows feedback.',
	props: {
		ref: api.createAnyProp({
			description: 'A reference to the underlying button element.',
			bindable: true,
			type: 'HTMLButtonElement',
			defaultValue: 'null'
		}),
		children: api.createAnyProp({
			description: 'Slot content for the copy button (e.g., custom label or icon).',
			type: 'Snippet'
		}),
		text: api.createStringProp({
			description: 'The text to copy to the clipboard.',
			required: true
		}),
		icon: api.createAnyProp({
			description: 'Custom icon to display in the button.',
			type: 'Snippet'
		}),
		animationDuration: api.createNumberProp({
			description: 'Duration of the copy animation in ms.',
			defaultValue: 500
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
		onCopy: api.createFunctionProp({
			description: 'Callback when copy is triggered. Receives status: "success" | "failure".',
			type: '(status: "success" | "failure") => void'
		})
	}
});

export const reference = {
	name: 'CopyButton' as const,
	components: {
		Root
	}
};
