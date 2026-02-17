import * as api from '../api-reference';
import type { TagsInputPropsWithoutHTML } from '$lib/components/ui/tags-input/types';

const Root = api.createComponentReference<TagsInputPropsWithoutHTML>({
	description: 'The root tags input component. Allows entry and validation of multiple tags.',
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
		}),
		onValueChange: api.createFunctionProp({
			description: 'A function called when the value changes',
			type: '(tags: string[]) => void'
		}),
		suggestions: api.createAnyProp({
			description: 'A list of autocomplete suggestions to display.',
			type: 'string[]'
		}),
		filterSuggestions: api.createFunctionProp({
			description:
				'A custom filter function for suggestions. Defaults to case-insensitive contains.',
			type: '(inputValue: string, suggestions: string[]) => string[]'
		}),
		restrictToSuggestions: api.createBooleanProp({
			description: 'When true, only values from the suggestions list can be added.',
			defaultValue: false
		})
	}
});

export const reference = {
	name: 'TagsInput' as const,
	components: {
		Root
	}
};
