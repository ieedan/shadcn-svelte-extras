import PhoneInput from './phone-input.svelte';
import type { TelInputOptions } from 'svelte-tel-input/types';

export const defaultOptions: TelInputOptions = {
	spaces: true,
	autoPlaceholder: false,
	format: 'international'
};

export { PhoneInput };

export type * from './types';
