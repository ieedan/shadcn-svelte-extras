import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Variants from './variants.svelte';
import variantsRaw from './variants.svelte?raw';
import Multiline from './multiline.svelte';
import multilineRaw from './multiline.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	variants: {
		code: variantsRaw,
		Component: Variants
	},
	multiline: {
		code: multilineRaw,
		Component: Multiline
	}
};

export { examples };
