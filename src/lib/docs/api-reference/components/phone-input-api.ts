import * as api from '../api-reference';
import type { PhoneInputProps } from '$lib/components/ui/phone-input/types';

const Root = api.createComponentReference<PhoneInputProps>({
	description: 'The root component for the phone input.',
	props: {
		country: api.createAnyProp({
			description: 'The selected country code.',
			bindable: true,
			type: 'CountryCode | null',
			defaultValue: 'null'
		}),
		defaultCountry: api.createAnyProp({
			description: 'The default country code.',
			type: 'CountryCode | null',
			defaultValue: 'null'
		}),
		name: api.createStringProp({
			description: 'The name attribute for the input.'
		}),
		placeholder: api.createStringProp({
			description: 'The placeholder for the input.',
			bindable: true
		}),
		disabled: api.createBooleanProp({
			description: 'Whether the input is disabled.',
			bindable: true,
			defaultValue: false
		}),
		readonly: api.createBooleanProp({
			description: 'Whether the input is readonly.',
			bindable: true,
			defaultValue: false
		}),
		class: api.createStringProp({
			description: 'Custom class for the input.'
		}),
		value: api.createAnyProp({
			description: 'The phone number value (E.164 format).',
			bindable: true,
			type: 'E164Number | null',
			defaultValue: 'null'
		}),
		valid: api.createBooleanProp({
			description: 'Whether the current value is valid.',
			bindable: true,
			defaultValue: false
		}),
		detailedValue: api.createAnyProp({
			description: 'Detailed value object for the phone input.',
			bindable: true,
			type: 'Partial<DetailedValue> | null'
		}),
		options: api.createAnyProp({
			description: 'Options for the phone input.',
			type: 'TelInputOptions',
			defaultValue: 'defaultOptions'
		}),
		order: api.createFunctionProp({
			description: 'Custom sort function for countries.',
			type: '(a: Country, b: Country) => number'
		})
	}
});

export const reference = {
	name: 'PhoneInput' as const,
	components: {
		Root
	}
};
