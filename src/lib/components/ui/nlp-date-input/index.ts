import NLPDateInput from './nlp-date-input.svelte';
import { en, uk, fr, de, es, it, ja, pt, nl, zh, ru, sv } from 'chrono-node';

export const locales = {
	en,
	uk,
	fr,
	de,
	es,
	it,
	ja,
	pt,
	nl,
	zh,
	ru,
	sv
};

export { NLPDateInput };

export type * from './types';
