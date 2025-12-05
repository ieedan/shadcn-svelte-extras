import type { ParsedResult } from 'chrono-node';
import { locales } from './index';

export type NLPDateInputProps = {
	min?: Date;
	max?: Date;
	locale?: keyof typeof locales;
	defaultValues?: string[];
	placeholder?: string;
	onChoice?: (opts: ParsedResult) => void;
};
