import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Loop from './loop.svelte';
import loopRaw from './loop.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	loop: {
		code: loopRaw,
		Component: Loop
	}
};

export { examples };
