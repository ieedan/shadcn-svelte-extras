import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import CustomStars from './custom-stars.svelte';
import customStarsRaw from './custom-stars.svelte?raw';
import Disabled from './disabled.svelte';
import disabledRaw from './disabled.svelte?raw';
import Readonly from './readonly.svelte';
import readonlyRaw from './readonly.svelte?raw';
import CustomColor from './custom-color.svelte';
import customColorRaw from './custom-color.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	customStars: {
		code: customStarsRaw,
		Component: CustomStars
	},
	disabled: {
		code: disabledRaw,
		Component: Disabled
	},
	readonly: {
		code: readonlyRaw,
		Component: Readonly
	},
	customColor: {
		code: customColorRaw,
		Component: CustomColor
	}
};

export { examples };
