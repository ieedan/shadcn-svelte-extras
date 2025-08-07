import * as api from '../api-reference';
import type { TagsComboboxPropsWithoutHTML } from '$lib/components/ui/tags-combobox/types';

const Root = api.createComponentReference<TagsComboboxPropsWithoutHTML>({
	description:
		'The root tags combobox component. Allows entry and validation of multiple tags with combobox functionality.',
	props: {
		value: api.createAnyProp({
			description: 'The current list of tags.',
			bindable: true,
			type: 'string[]',
			defaultValue: '[]'
		}),
		options: api.createAnyProp({
			description: 'Array of options to display in the combobox dropdown.',
			type: 'TagsComboboxOption[]',
			defaultValue: '[]'
		}),
		validate: api.createFunctionProp({
			description:
				'A function to validate and transform a tag before it is added. Return the transformed tag or undefined to reject.',
			type: '(val: string, tags: string[]) => string | undefined',
			defaultValue: 'defaultValidate'
		}),
		onOptionSelect: api.createFunctionProp({
			description: 'Callback function called when an option is selected from the dropdown.',
			type: '(option: TagsComboboxOption) => void',
			defaultValue: 'undefined'
		})
	}
});

export const reference = {
	name: 'TagsCombobox' as const,
	components: {
		Root
	}
};
