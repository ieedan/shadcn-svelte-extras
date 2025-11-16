import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Placeholder from './placeholder.svelte';
import placeholderRaw from './placeholder.svelte?raw';
import Reactive from './reactive.svelte';
import reactiveRaw from './reactive.svelte?raw';
import Valid from './valid.svelte';
import validRaw from './valid.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	placeholder: {
		code: placeholderRaw,
		Component: Placeholder
	},
	reactive: {
		code: reactiveRaw,
		Component: Reactive
	},
	valid: {
		code: validRaw,
		Component: Valid
	}
};

export { examples };
