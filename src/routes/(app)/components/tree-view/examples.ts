import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import CustomIcons from './custom-icons.svelte';
import customIconsRaw from './custom-icons.svelte?raw';
import treeViewFileCustomRaw from './tree-view-file-custom.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	customIcons: {
		code: customIconsRaw,
		Component: CustomIcons
	},
	customFileComponentCode: treeViewFileCustomRaw
};

export { examples };
