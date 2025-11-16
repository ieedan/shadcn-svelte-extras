import Basic from './basic.svelte';
import basicRaw from './basic.svelte?raw';
import Form from './form.svelte';
import formRaw from './form.svelte?raw';
import schemaRaw from './schema.ts?raw';

const examples = {
	basic: {
		code: basicRaw,
		Component: Basic
	},
	form: {
		code: formRaw,
		Component: Form
	},
	schema: schemaRaw
};

export { examples };
