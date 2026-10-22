import {
	CalendarDate,
	fromDate,
	getLocalTimeZone,
	parseDate,
	today,
	toCalendarDate,
	type DateValue
} from '@internationalized/date';
import {
	DEFAULT_RELATIVE_DATES,
	isRelativeDateValue,
	resolveRelativeDate,
	type AnyRelativeDateDefinition,
	type DateSpan,
	type RelativeDateContext
} from './relative-dates.js';
import type {
	BooleanFilter,
	DateFilter,
	Filter,
	FilterList,
	IdFilter,
	NumberFilter,
	StringFilter
} from '../filters/types.js';

export type UnresolvedBehavior = 'ignore' | 'match-none' | 'error';

export type FilterContext = RelativeDateContext & {
	relativeDates: Record<string, AnyRelativeDateDefinition>;
	/**
	 * What to do with a relative date whose definition is missing (e.g. a saved filter using an
	 * id that was removed). Ignoring it widens the results, so servers should use `match-none` or
	 * `error`.
	 */
	onUnresolved: UnresolvedBehavior;
};

export type FilterContextOptions = {
	/** Extra definitions, merged over the built-in ones by id. */
	relativeDates?: AnyRelativeDateDefinition[];
	timeZone?: string;
	config?: Record<string, unknown>;
	onUnresolved?: UnresolvedBehavior;
};

export function createFilterContext(options: FilterContextOptions = {}): FilterContext {
	const timeZone = options.timeZone ?? getLocalTimeZone();
	return {
		today: toCalendarDate(today(timeZone)),
		timeZone,
		config: options.config ?? {},
		relativeDates: Object.fromEntries(
			[...DEFAULT_RELATIVE_DATES, ...(options.relativeDates ?? [])].map((d) => [d.id, d])
		),
		onUnresolved: options.onUnresolved ?? 'ignore'
	};
}

/**
 * Filters `data` down to the rows that match **every** filter (AND).
 *
 * Filters that are incomplete or can't be interpreted (e.g. a `between` filter that only has a
 * single date) are ignored so they never hide the whole dataset.
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

	// relative values are stored as the id of a definition and its params instead of a date
	const raw: unknown = filter.value;
	if (isRelativeDateValue(raw)) {
		const span = resolveRelativeDate(raw, context.relativeDates, context);
		if (!span) {
			if (context.onUnresolved === 'error') {
				throw new Error(`Unknown relative date "${raw.id}"`);
			}
			return context.onUnresolved === 'ignore';
		}
		return matchesSpan(row, span, filter.operator);
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

/**
 * Operators apply to the resolved span: `=` is inside it, `>` after its end and `<` before its
 * start. An open end never has anything beyond it.
 */
function matchesSpan(
	row: CalendarDate | null,
	{ from, to }: DateSpan,
	operator: DateFilter['operator']
): boolean {
	const afterStart = row !== null && (!from || row.compare(from) >= 0);
	const beforeEnd = row !== null && (!to || row.compare(to) <= 0);
	const inside = afterStart && beforeEnd;
	switch (operator) {
		case '=':
		case 'b<=a<=c':
			return inside;
		case '!=':
		case '!b<=a<=c':
			return !inside;
		case '>':
			return row !== null && !!to && row.compare(to) > 0;
		case '<':
			return row !== null && !!from && row.compare(from) < 0;
		case '>=':
			return afterStart;
		case '<=':
			return beforeEnd;
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
