import * as api from '../api-reference';
import type { LanguageSwitcherProps } from '$lib/components/ui/language-switcher/types';

const Root = api.createComponentReference<LanguageSwitcherProps>({
	description: 'The root language switcher component.',
	props: {
		languages: api.createAnyProp({
			description: 'List of available languages. Each language should have a code and label.',
			required: true,
			type: 'Language[]'
		}),
		value: api.createStringProp({
			description: 'Current selected language code.',
			bindable: true,
			defaultValue: "''"
		}),
		align: api.createStringUnionProp({
			type: '"start" | "center" | "end"',
			description: 'Dropdown alignment.',
			defaultValue: 'end'
		}),
		variant: api.createStringUnionProp({
			type: '"outline" | "ghost"',
			description: 'Button variant.',
			defaultValue: 'outline'
		}),
		onChange: api.createFunctionProp({
			description: 'Called when the language changes.',
			type: '(code: string) => void'
		}),
		class: api.createStringProp({
			description: 'Additional classes to apply to the root element.'
		})
	}
});

export const components = {
	Root
};
