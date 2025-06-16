import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Keys from './keys.svelte';
import keysRaw from './keys.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	keys: {
		code: keysRaw,
		Component: Keys
	}
};

export { examples };
