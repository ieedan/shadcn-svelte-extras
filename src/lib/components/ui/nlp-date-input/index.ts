import NLPDateInput from './nlp-date-input.svelte';
import { en, uk, fr, de, es, it, ja, pt, nl, zh, ru, sv } from 'chrono-node';
import * as chrono from 'chrono-node';
import type { ParsedResult, Chrono } from 'chrono-node';

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

export interface NLPSuggestion {
	display: string;
	parseText: string;
	date: Date;
}

function rtf(locale: string) {
	return new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
}

function relativeDayLabel(offset: number, locale: string) {
	return normalize(rtf(locale).format(offset, 'day'));
}

function relativeTimeLabel(amount: number, unit: Intl.RelativeTimeFormatUnit, locale: string) {
	return normalize(rtf(locale).format(amount, unit));
}

function formatTime(date: Date, locale: string): string {
	return new Intl.DateTimeFormat(locale, {
		hour: '2-digit',
		minute: '2-digit'
	}).format(date);
}

function normalize(str: string): string {
	return str
		.normalize('NFKD')
		.replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'")
		.replace(/[\u201C\u201D\u201E\u201F]/g, '"')
		.replace(/[\u2013\u2014]/g, '-')
		.replace(/\u00A0/g, ' ')
		.trim();
}

function formatDisplay(date: Date, locale: string): string {
	const now = new Date();
	const diffDays = Math.round(
		(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
			Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())) /
			86400000
	);

	let out: string;

	if (Math.abs(diffDays) <= 1) {
		out = `${relativeDayLabel(diffDays, locale)} ${formatTime(date, locale)}`;
	} else {
		out = new Intl.DateTimeFormat(locale, {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		}).format(date);
	}

	return normalize(out);
}

function getParser(locale: string): (txt: string) => Date | null {
	const localizedParsers = chrono as unknown as Record<string, Partial<Chrono>>;

	const parser = localizedParsers[locale];
	if (parser && typeof parser.parseDate === 'function') {
		return (txt: string) => parser.parseDate!(txt);
	}

	return (txt: string) => chrono.parseDate(txt);
}

function generateTemplates(input: string, locale: string): string[] {
	const results: string[] = [];
	results.push(relativeDayLabel(-1, locale));
	results.push(relativeDayLabel(0, locale));
	results.push(relativeDayLabel(1, locale));

	for (let h = 1; h <= 3; h++) {
		results.push(relativeTimeLabel(h, 'hour', locale));
		results.push(relativeTimeLabel(-h, 'hour', locale));
	}

	for (let d = 1; d <= 3; d++) {
		results.push(relativeTimeLabel(d, 'day', locale));
		results.push(relativeTimeLabel(-d, 'day', locale));
	}

	{
		const today = new Date();
		const fmt = new Intl.DateTimeFormat(locale, { weekday: 'long' });

		for (let i = 1; i <= 7; i++) {
			const dt = new Date(today);
			dt.setDate(today.getDate() + i);
			results.push(fmt.format(dt));
		}
	}

	if (!input) return results;

	const lower = input.toLowerCase();
	return results.filter((r) => r.toLowerCase().startsWith(lower));
}

function expandAroundDate(
	date: Date,
	locale: string,
	min?: Date,
	max?: Date,
	hasExplicitTime?: boolean
): NLPSuggestion[] {
	const out: NLPSuggestion[] = [];
	const base = date.getTime();

	// Note: Maybe make these configurable in the future?
	const minuteSteps = hasExplicitTime ? [15, 30, 45] : [];
	const hourSteps = [-2, -1, 1, 2];

	for (const h of hourSteps) {
		const d = new Date(base);
		d.setHours(d.getHours() + h);
		if (min && d < min) continue;
		if (max && d > max) continue;

		out.push({
			display: formatDisplay(d, locale),
			parseText: '',
			date: d
		});
	}

	for (const m of minuteSteps) {
		const d = new Date(base);
		d.setMinutes(d.getMinutes() + m);
		if (min && d < min) continue;
		if (max && d > max) continue;
		out.push({
			display: formatDisplay(d, locale),
			parseText: '',
			date: d
		});
	}

	return out;
}

function detectExplicitTime(input: string, locale: string): boolean {
	const localizedParsers = chrono as unknown as Record<string, Partial<Chrono>>;
	const parserForLocale = localizedParsers[locale];

	const results: ParsedResult[] = parserForLocale?.parse
		? parserForLocale.parse(input)
		: chrono.parse(input);

	if (results.length === 0) return false;

	const start = results[0].start;
	if (!start) return false;

	return start.isCertain('hour') || start.isCertain('minute');
}

export function getNlpSuggestions(
	input: string,
	locale: string,
	min?: Date,
	max?: Date,
	defaultInputs?: string[]
): NLPSuggestion[] {
	const trimmed = input.trim();
	const parse = getParser(locale);

	const hasExplicitTime = detectExplicitTime(trimmed, locale);

	if (!trimmed) {
		const base = defaultInputs?.length
			? defaultInputs
			: [relativeDayLabel(-1, locale), relativeDayLabel(0, locale), relativeDayLabel(1, locale)];

		const suggestions = base
			.map((txt) => {
				const d = parse(txt);
				if (!d) return null;
				return {
					display: formatDisplay(d, locale),
					parseText: txt,
					date: d
				};
			})
			.filter(Boolean) as NLPSuggestion[];

		return uniqueByDate(suggestions);
	}

	let suggestions: NLPSuggestion[] = [];

	const parsed = parse(trimmed);
	if (parsed) {
		suggestions.push({
			display: formatDisplay(parsed, locale),
			parseText: trimmed,
			date: parsed
		});

		suggestions.push(...expandAroundDate(parsed, locale, min, max, hasExplicitTime));
	}

	const templates = generateTemplates(trimmed, locale);
	for (const t of templates) {
		const d = parse(t);
		if (!d) continue;
		suggestions.push({
			display: formatDisplay(d, locale),
			parseText: t,
			date: d
		});
	}

	suggestions = uniqueByDate(suggestions);

	if (suggestions.length < 3 && parsed) {
		const extra = expandAroundDate(parsed, locale, min, max, hasExplicitTime);
		for (const e of extra) {
			if (suggestions.length >= 3) break;
			suggestions.push(e);
		}
	}

	return uniqueByDate(suggestions);
}

function normalizeDate(d: Date): number {
	const copy = new Date(d);
	copy.setSeconds(0, 0);
	return copy.getTime();
}

function uniqueByDate(arr: NLPSuggestion[]): NLPSuggestion[] {
	const seen = new Set<number>();

	return arr.filter((s) => {
		const t = normalizeDate(s.date);
		if (seen.has(t)) return false;
		seen.add(t);
		if (t !== s.date.getTime()) s.date = new Date(t);
		return true;
	});
}
