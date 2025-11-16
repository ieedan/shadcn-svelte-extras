import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import MinMax from './min-max.svelte';
import minMaxRaw from './min-max.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	minMax: {
		code: minMaxRaw,
		Component: MinMax
	}
};

export { examples };
