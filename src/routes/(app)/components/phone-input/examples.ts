import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import DefaultCountry from './default-country.svelte';
import defaultCountryRaw from './default-country.svelte?raw';
import DefaultValue from './default-value.svelte';
import defaultValueRaw from './default-value.svelte?raw';
import CustomOrdering from './custom-ordering.svelte';
import customOrderingRaw from './custom-ordering.svelte?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	defaultCountry: {
		code: defaultCountryRaw,
		Component: DefaultCountry
	},
	defaultValue: {
		code: defaultValueRaw,
		Component: DefaultValue
	},
	customOrdering: {
		code: customOrderingRaw,
		Component: CustomOrdering
	}
};

export { examples };
