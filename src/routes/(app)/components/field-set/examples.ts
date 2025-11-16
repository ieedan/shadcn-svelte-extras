import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Destructive from './destructive.svelte';
import destructiveRaw from './destructive.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	destructive: {
		code: destructiveRaw,
		Component: Destructive
	}
};

export { examples };
