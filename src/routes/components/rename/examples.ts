import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import ContentEditable from './content-editable.svelte';
import contentEditableRaw from './content-editable.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	contentEditable: {
		code: contentEditableRaw,
		Component: ContentEditable
	}
};

export { examples };
