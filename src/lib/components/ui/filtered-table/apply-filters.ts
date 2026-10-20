import {
	CalendarDate,
	endOfMonth,
	endOfYear,
	fromDate,
	getLocalTimeZone,
	parseDate,
	startOfMonth,
	startOfYear,
	today,
	toCalendarDate,
	type DateValue
} from '@internationalized/date';
import type {
	BooleanFilter,
	DateFilter,
	Filter,
	FilterList,
	IdFilter,
	NumberFilter,
	StringFilter
} from '../filters/types.js';

/** Resolves a relative date id (e.g. `last-7-days`) to an inclusive `[from, to]` range of days. */
export type RelativeDateResolver = (today: CalendarDate) => [CalendarDate, CalendarDate];

/**
 * The relative date ids understood out of the box. A date filter whose value is one of these ids
 * (instead of a date) is resolved against the current day every time the table is filtered.
 */
export const DEFAULT_RELATIVE_DATES: Record<string, RelativeDateResolver> = {
	today: (now) => [now, now],
	yesterday: (now) => [now.subtract({ days: 1 }), now.subtract({ days: 1 })],
	'last-7-days': (now) => [now.subtract({ days: 6 }), now],
	'last-30-days': (now) => [now.subtract({ days: 29 }), now],
	'this-month': (now) => [startOfMonth(now), endOfMonth(now)],
	'last-month': (now) => {
		const last = now.subtract({ months: 1 });
		return [startOfMonth(last), endOfMonth(last)];
	},
	'this-year': (now) => [startOfYear(now), endOfYear(now)]
};

export type FilterContext = {
	today: CalendarDate;
	relativeDates: Record<string, RelativeDateResolver>;
};

export function createFilterContext(
	relativeDates: Record<string, RelativeDateResolver> = {}
): FilterContext {
	return {
		today: toCalendarDate(today(getLocalTimeZone())),
		relativeDates: { ...DEFAULT_RELATIVE_DATES, ...relativeDates }
	};
}

/**
 * Filters `data` down to the rows that match **every** filter (AND).
 *
 * Filters that are incomplete or can't be interpreted (e.g. a `between` filter that only has a
 * single date, or a relative date id) are ignored so they never hide the whole dataset.
 */
export function applyFilters<T extends Record<string, unknown>>(
	data: readonly T[],
	filters: FilterList,
	context: FilterContext = createFilterContext()
): T[] {
	if (filters.length === 0) return [...data];
	return data.filter((row) =>
		filters.every((filter) => matchesFilter(row[filter.name], filter, context))
	);
}

export function matchesFilter(
	value: unknown,
	filter: Filter,
	context: FilterContext = createFilterContext()
): boolean {
	switch (filter.type) {
		case 'number':
			return matchesNumber(value, filter);
		case 'boolean':
			return matchesBoolean(value, filter);
		case 'string':
			return matchesString(value, filter);
		case 'id':
			return matchesId(value, filter);
		case 'date':
			return matchesDate(value, filter, context);
		default:
			return true;
	}
}

function compare<A>(
	a: A,
	b: A,
	operator: string,
	cmp: (a: A, b: A) => number
): boolean | undefined {
	switch (operator) {
		case '=':
			return cmp(a, b) === 0;
		case '!=':
			return cmp(a, b) !== 0;
		case '>':
			return cmp(a, b) > 0;
		case '<':
			return cmp(a, b) < 0;
		case '>=':
			return cmp(a, b) >= 0;
		case '<=':
			return cmp(a, b) <= 0;
	}
	return undefined;
}

function isNil(value: unknown): value is null | undefined {
	return value === null || value === undefined;
}

function matchesNumber(value: unknown, filter: NumberFilter): boolean {
	if (typeof filter.value !== 'number' || Number.isNaN(filter.value)) return true;
	const n = typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN;
	if (isNil(value) || value === '' || Number.isNaN(n)) return filter.operator === '!=';
	return compare(n, filter.value, filter.operator, (a, b) => a - b) ?? true;
}

function matchesBoolean(value: unknown, filter: BooleanFilter): boolean {
	if (typeof filter.value !== 'boolean') return true;
	const equal = toBoolean(value) === filter.value;
	return filter.operator === '!=' ? !equal : equal;
}

function toBoolean(value: unknown): boolean | null {
	if (typeof value === 'boolean') return value;
	if (value === 'true') return true;
	if (value === 'false') return false;
	return null;
}

function matchesString(value: unknown, filter: StringFilter): boolean {
	if (typeof filter.value !== 'string') return true;
	// case-insensitive so users don't have to guess how the data is cased
	const haystack = isNil(value) ? null : String(value).toLowerCase();
	const needle = filter.value.toLowerCase();

	const positive = (op: string): boolean => {
		if (haystack === null) return false;
		switch (op) {
			case '=':
				return haystack === needle;
			case '*a':
				return haystack.startsWith(needle);
			case 'a*':
				return haystack.endsWith(needle);
			case '*a*':
				return haystack.includes(needle);
		}
		return true;
	};

	return filter.operator.startsWith('!')
		? !positive(filter.operator.slice(1))
		: positive(filter.operator);
}

function matchesId(value: unknown, filter: IdFilter): boolean {
	// The pill's value select writes ids back as strings, so compare as strings to support
	// numeric ids.
	const equal = !isNil(value) && String(value) === String(filter.value);
	return filter.operator === '!=' ? !equal : equal;
}

function matchesDate(value: unknown, filter: DateFilter, context: FilterContext): boolean {
	const isRange = filter.operator === 'b<=a<=c' || filter.operator === '!b<=a<=c';
	const row = toCalendarDay(value);

	// relative values are stored as an id string instead of a date
	const raw: unknown = filter.value;
	if (typeof raw === 'string') {
		const resolve = context.relativeDates[raw];
		if (!resolve) return true;
		return matchesRelativeDate(row, resolve(context.today), filter.operator);
	}

	if (isRange) {
		if (!Array.isArray(filter.value) || filter.value.length !== 2) return true;
		const start = toDay(filter.value[0]);
		const end = toDay(filter.value[1]);
		if (!start || !end) return true;
		const [from, to] = start.compare(end) <= 0 ? [start, end] : [end, start];
		const inside = row !== null && row.compare(from) >= 0 && row.compare(to) <= 0;
		return filter.operator === '!b<=a<=c' ? !inside : inside;
	}

	if (Array.isArray(filter.value)) return true;
	const target = toDay(filter.value);
	if (!target) return true;
	if (row === null) return filter.operator === '!=';
	return compare(row, target, filter.operator, (a, b) => a.compare(b)) ?? true;
}

function matchesRelativeDate(
	row: CalendarDate | null,
	[from, to]: [CalendarDate, CalendarDate],
	operator: DateFilter['operator']
): boolean {
	const inside = row !== null && row.compare(from) >= 0 && row.compare(to) <= 0;
	switch (operator) {
		case '=':
		case 'b<=a<=c':
			return inside;
		case '!=':
		case '!b<=a<=c':
			return !inside;
		case '>':
			return row !== null && row.compare(to) > 0;
		case '<':
			return row !== null && row.compare(from) < 0;
		case '>=':
			return row !== null && row.compare(from) >= 0;
		case '<=':
			return row !== null && row.compare(to) <= 0;
	}
}

/** Dates are compared by calendar day so `=` means "same day" regardless of time. */
function toDay(value: unknown): CalendarDate | null {
	if (isDateValue(value)) return toCalendarDate(value);
	return null;
}

function isDateValue(value: unknown): value is DateValue {
	return (
		typeof value === 'object' &&
		value !== null &&
		'calendar' in value &&
		'year' in value &&
		'compare' in value
	);
}

function toCalendarDay(value: unknown): CalendarDate | null {
	if (isNil(value)) return null;
	if (isDateValue(value)) return toCalendarDate(value);
	if (value instanceof Date) {
		return Number.isNaN(value.getTime())
			? null
			: toCalendarDate(fromDate(value, getLocalTimeZone()));
	}
	if (typeof value === 'number') return toCalendarDay(new Date(value));
	if (typeof value === 'string') {
		// `new Date('2024-01-05')` is parsed as UTC and can land on the previous day locally, so
		// plain dates are parsed as calendar dates instead.
		try {
			return parseDate(value);
		} catch {
			return toCalendarDay(new Date(value));
		}
	}
	return null;
}
