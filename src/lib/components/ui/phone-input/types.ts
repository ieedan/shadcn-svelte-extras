import type {
	Country,
	CountryCode,
	DetailedValue,
	E164Number,
	TelInputOptions
} from 'svelte-tel-input/types';

export type PhoneInputProps = {
	country?: CountryCode | null;
	defaultCountry?: CountryCode | null;
	name?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	class?: string;
	value?: E164Number | null;
	valid?: boolean;
	detailedValue?: Partial<DetailedValue> | null;
	options?: TelInputOptions;
	order?: ((a: Country, b: Country) => number) | undefined;
};
