import { locales, type NLPSuggestion } from './index';

export type NLPDateInputProps = {
	min?: Date;
	max?: Date;
	locale?: keyof typeof locales;
	defaultValues?: string[];
	placeholder?: string;
	onChoice?: (opts: NLPSuggestion) => void;
};
