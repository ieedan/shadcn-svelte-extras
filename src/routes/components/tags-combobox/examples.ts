import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import customValidateCode from './custom-validate?raw';
import Lowercase from './lowercase.svelte';
import lowercaseRaw from './lowercase.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	customValidateCode,
	lowercase: {
		code: lowercaseRaw,
		Component: Lowercase
	}
};

export { examples };
