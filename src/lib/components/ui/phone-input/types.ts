import type { Country, CountryCode, DetailedValue, TelInputOptions } from 'svelte-tel-input/types';

export type PhoneInputProps = {
	country?: CountryCode | null;
	defaultCountry?: CountryCode | null;
	name?: string;
	placeholder?: string;
	disabled?: boolean;
	readonly?: boolean;
	required?: boolean;
	class?: string;
	value?: string;
	valid?: boolean;
	detailedValue?: Partial<DetailedValue> | null;
	options?: TelInputOptions;
	order?: ((a: Country, b: Country) => number) | undefined;
};
