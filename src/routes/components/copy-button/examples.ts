import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Icon from './icon.svelte';
import iconRaw from './icon.svelte?raw';
import WithText from './with-text.svelte';
import withTextRaw from './with-text.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	icon: {
		code: iconRaw,
		Component: Icon
	},
	withText: {
		code: withTextRaw,
		Component: WithText
	}
};

export { examples };
