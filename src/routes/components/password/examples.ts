import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Copy from './copy.svelte';
import copyRaw from './copy.svelte?raw';
import Both from './both.svelte';
import bothRaw from './both.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	copy: {
		code: copyRaw,
		Component: Copy
	},
	both: {
		code: bothRaw,
		Component: Both
	}	
};

export { examples };
