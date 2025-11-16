import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Variants from './variants.svelte';
import variantsRaw from './variants.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	variants: {
		code: variantsRaw,
		Component: Variants
	}
};

export { examples };
