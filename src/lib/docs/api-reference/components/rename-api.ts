import type { RenameProps } from '$lib/components/ui/rename/rename.svelte';
import * as api from '../api-reference';

const Root = api.createComponentReference<RenameProps<'p'>>({
	name: 'Root',
	description: 'Inline rename component that toggles between a text view and an input for editing.',
	props: {
		id: api.createStringProp({
			description: 'The unique id for the underlying element and input.'
		}),
		this: api.createStringUnionProp({
			type: '"a" | "abbr" | "address" | "b" | "bdi" | "bdo" | "blockquote" | "cite" | "code" | "data" | "dd" | "del" | "dfn" | "dt" | "em" | "figcaption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "header" | "hgroup" | "i" | "ins" | "kbd" | "label" | "legend" | "li" | "main" | "mark" | "nav" | "noscript" | "p" | "pre" | "q" | "rp" | "rt" | "ruby" | "s" | "samp" | "search" | "section" | "small" | "span" | "strong" | "sub" | "summary" | "sup" | "time" | "title" | "u" | "var"',
			description: 'The tag name to render in view mode.'
		}),
		mode: api.createStringUnionProp({
			type: '"edit" | "view"',
			description: 'The current mode of the component.',
			bindable: true,
			defaultValue: 'view'
		}),
		blurBehavior: api.createStringUnionProp({
			type: '"exit" | "none"',
			description: 'What to do on input blur in edit mode.'
		}),
		value: api.createStringProp({
			description: 'The accepted value of the input.',
			bindable: true,
			required: true
		}),
		class: api.createStringProp({
			description: 'Classes applied to both input and text.'
		}),
		inputClass: api.createStringProp({
			description: 'Classes applied to the input element.'
		}),
		textClass: api.createStringProp({
			description: 'Classes applied to the text element.'
		}),
		onSave: api.createFunctionProp({
			description:
				'Called when saving. Return true to accept the value, false to keep invalid state.',
			type: '(value: string) => boolean | Promise<boolean>'
		}),
		onCancel: api.createFunctionProp({
			description: 'Called when cancelling edit mode.',
			type: '() => void | Promise<void>'
		}),
		validate: api.createFunctionProp({
			description: 'Validation function used to determine invalid state while editing.',
			type: '(value: string) => boolean',
			defaultValue: '() => true'
		})
	}
});

const Provider = api.createComponentReference({
	name: 'Provider',
	description:
		'Context provider enabling external Edit/Cancel/Save buttons to control the current Rename input.',
	props: {}
});

const Edit = api.createComponentReference({
	name: 'Edit',
	description: 'Button that switches the current Rename input into edit mode.',
	props: {
		child: api.createAnyProp({
			description: 'Custom component to render instead of the default button.',
			type: 'Snippet',
			tooltip: 'Snippet<[{ props: Record<string, unknown> }]>'
		})
	}
});

const Cancel = api.createComponentReference({
	name: 'Cancel',
	description: 'Button that cancels editing and returns to view mode.',
	props: {
		child: api.createAnyProp({
			description: 'Custom component to render instead of the default button.',
			type: 'Snippet',
			tooltip: 'Snippet<[{ props: Record<string, unknown> }]>'
		})
	}
});

const Save = api.createComponentReference({
	name: 'Save',
	description: 'Button that triggers save on the current Rename input.',
	props: {
		child: api.createAnyProp({
			description: 'Custom component to render instead of the default button.',
			type: 'Snippet',
			tooltip: 'Snippet<[{ props: Record<string, unknown> }]>'
		})
	}
});

export const reference = {
	name: 'Rename' as const,
	components: {
		Root,
		Provider,
		Edit,
		Cancel,
		Save
	}
};
