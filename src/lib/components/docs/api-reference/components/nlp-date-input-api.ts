import * as api from '../api-reference';
import type { NLPDateInputProps } from '$lib/components/ui/nlp-date-input/types';

const Root = api.createComponentReference<NLPDateInputProps>({
	description:
		'The root component for the NLP Date Input. Allows users to enter dates in natural language and get suggestions.',
	props: {
		min: api.createDateProp({
			description: 'The minimum date allowed for suggestions.'
		}),
		max: api.createDateProp({
			description: 'The maximum date allowed for suggestions.'
		}),
		placeholder: api.createStringProp({
			description: 'The placeholder text for the input.',
			defaultValue: 'E.g. "tomorrow at 5pm" or "in 2 hours"'
		}),
		onChoice: api.createFunctionProp({
			description: 'Callback fired when a suggestion is selected.',
			type: '(opts: { label: string; date: Date }) => void'
		})
	}
});

export const components = {
	Root
};
