import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import ContentEditable from './content-editable.svelte';
import contentEditableRaw from './content-editable.svelte?raw';
import ContextMenu from './context-menu.svelte';
import fileRaw from './file.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	contentEditable: {
		code: contentEditableRaw,
		Component: ContentEditable
	},
	contextMenu: {
		code: fileRaw,
		Component: ContextMenu
	}
};

export { examples };
