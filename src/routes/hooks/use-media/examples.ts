import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Custom from './custom.svelte';
import customRaw from './custom.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	custom: {
		code: customRaw,
		Component: Custom
	}
};

export { examples };
