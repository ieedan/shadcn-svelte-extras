import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Variants from './variants.svelte';
import variantsRaw from './variants.svelte?raw';
import Paraglide from './paraglide.svelte';
import paraglideRaw from './paraglide.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	variants: {
		code: variantsRaw,
		Component: Variants
	},
	paraglide: {
		code: paraglideRaw,
		Component: Paraglide
	}
};

export { examples };
