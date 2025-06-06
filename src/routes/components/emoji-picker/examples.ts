import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Skin from './skin.svelte';
import skinRaw from './skin.svelte?raw';
import Popover from './popover.svelte';
import popoverRaw from './popover.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	skin: {
		code: skinRaw,
		Component: Skin
	},
	popover: {
		code: popoverRaw,
		Component: Popover
	}
};

export { examples };
