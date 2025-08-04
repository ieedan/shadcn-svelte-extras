import * as api from '../api-reference';
import type { TagsComboboxPropsWithoutHTML } from '$lib/components/ui/tags-combobox/types';

const Root = api.createComponentReference<TagsComboboxPropsWithoutHTML>({
	description: 'The root tags combobox component. Allows entry and validation of multiple tags with combobox functionality.',
	props: {
		value: api.createAnyProp({
			description: 'The current list of tags.',
			bindable: true,
			type: 'string[]',
			defaultValue: '[]'
		}),
		validate: api.createFunctionProp({
			description:
				'A function to validate and transform a tag before it is added. Return the transformed tag or undefined to reject.',
			type: '(val: string, tags: string[]) => string | undefined',
			defaultValue: 'defaultValidate'
		})
	}
});

export const reference = {
	name: 'TagsCombobox' as const,
	components: {
		Root
	}
};
