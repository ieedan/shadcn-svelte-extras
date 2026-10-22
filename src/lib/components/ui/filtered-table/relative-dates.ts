import {
	CalendarDate,
	endOfMonth,
	endOfWeek,
	endOfYear,
	startOfMonth,
	startOfWeek,
	startOfYear,
	type DateDuration
} from '@internationalized/date';
import type { FilterValueOption, RelativeDateValue } from '../filters/types.js';

export type RelativeDateParams = Record<string, string | number>;

export type RelativeDateParamSpec = { name: string } & (
	| { type: 'number'; default: number; min?: number }
	| { type: 'select'; default: string; options: { value: string; label: string }[] }
);

/** A relative date a user can pick from. */
export type RelativeDateOption = FilterValueOption & {
	/**
	 * Saved filters reference this so it must never be reused for something else. If the meaning
	 * has to change, add a new id.
	 */
	id: string;
	/** Parameters the user can edit. */
	params?: RelativeDateParamSpec[];
};

export function isRelativeDateValue(value: unknown): value is RelativeDateValue {
	return (
		typeof value === 'object' && value !== null && 'id' in value && typeof value.id === 'string'
	);
}

export function defaultRelativeParams(option: RelativeDateOption): RelativeDateParams {
	return Object.fromEntries((option.params ?? []).map((spec) => [spec.name, spec.default]));
}

/** Creates the value to store on a filter for an option, using its default params. */
export function createRelativeDateValue(option: RelativeDateOption): RelativeDateValue {
	return { id: option.id, params: defaultRelativeParams(option) };
}

/**
 * Resolving relative dates into real days. Definitions are pure functions so the same module can be
 * imported on the client and on the server to run a saved filter.
 */

/** An inclusive range of days. Leave an end off to make the range open ended. */
export type DateSpan = { from?: CalendarDate; to?: CalendarDate };

/** Everything a definition may read, nothing environmental should be read from globals. */
export type RelativeDateContext = {
	/** The current day in the viewer's time zone. */
	today: CalendarDate;
	timeZone: string;
	/** App specific settings (e.g. `fiscalYearStartMonth`) for definitions to read. */
	config: Record<string, unknown>;
};

export type RelativeDateDefinition<P extends RelativeDateParams = RelativeDateParams> =
	RelativeDateOption & {
		resolve: (context: RelativeDateContext, params: P) => DateSpan;
	};

// definitions with different params have to live in the same list
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRelativeDateDefinition = RelativeDateDefinition<any>;

export function defineRelativeDate<P extends RelativeDateParams = Record<string, never>>(
	definition: RelativeDateDefinition<P>
): RelativeDateDefinition<P> {
	return definition;
}

/**
 * Turns a stored relative value into real days. Returns `null` when the definition is unknown or
 * throws, so callers can decide how strict to be. This is also the function to call on a server
 * to run a saved view.
 */
export function resolveRelativeDate(
	value: RelativeDateValue,
	definitions: Record<string, AnyRelativeDateDefinition>,
	context: RelativeDateContext
): DateSpan | null {
	const definition = definitions[value.id];
	if (!definition) return null;
	try {
		return definition.resolve(context, {
			...defaultRelativeParams(definition),
			...value.params
		});
	} catch {
		return null;
	}
}

const UNIT_OPTIONS = [
	{ value: 'day', label: 'days' },
	{ value: 'week', label: 'weeks' },
	{ value: 'month', label: 'months' },
	{ value: 'year', label: 'years' }
];

const duration = (unit: string, amount: number) => ({ [`${unit}s`]: amount }) as DateDuration;

const point = (day: CalendarDate): DateSpan => ({ from: day, to: day });

export const today = defineRelativeDate({
	id: 'today',
	label: 'Today',
	resolve: ({ today }) => point(today)
});

export const yesterday = defineRelativeDate({
	id: 'yesterday',
	label: 'Yesterday',
	resolve: ({ today }) => point(today.subtract({ days: 1 }))
});

export const thisWeek = defineRelativeDate({
	id: 'this-week',
	label: 'This week',
	resolve: ({ today }) => ({ from: startOfWeek(today, 'en-US'), to: endOfWeek(today, 'en-US') })
});

export const thisMonth = defineRelativeDate({
	id: 'this-month',
	label: 'This month',
	resolve: ({ today }) => ({ from: startOfMonth(today), to: endOfMonth(today) })
});

export const lastMonth = defineRelativeDate({
	id: 'last-month',
	label: 'Last month',
	resolve: ({ today }) => {
		const last = today.subtract({ months: 1 });
		return { from: startOfMonth(last), to: endOfMonth(last) };
	}
});

export const thisYear = defineRelativeDate({
	id: 'this-year',
	label: 'This year',
	resolve: ({ today }) => ({ from: startOfYear(today), to: endOfYear(today) })
});

/** A rolling window that ends today, e.g. "In the last 3 months". */
export const lastN = defineRelativeDate<{ n: number; unit: string }>({
	id: 'last-n',
	label: 'In the last',
	params: [
		{ name: 'n', type: 'number', default: 7, min: 1 },
		{ name: 'unit', type: 'select', default: 'day', options: UNIT_OPTIONS }
	],
	resolve: ({ today }, { n, unit }) => ({
		from: today.subtract(duration(unit, n)).add({ days: 1 }),
		to: today
	})
});

/** A rolling window that starts today, e.g. "In the next 2 weeks". */
export const nextN = defineRelativeDate<{ n: number; unit: string }>({
	id: 'next-n',
	label: 'In the next',
	params: [
		{ name: 'n', type: 'number', default: 7, min: 1 },
		{ name: 'unit', type: 'select', default: 'day', options: UNIT_OPTIONS }
	],
	resolve: ({ today }, { n, unit }) => ({
		from: today,
		to: today.add(duration(unit, n)).subtract({ days: 1 })
	})
});

/** The relative dates every table understands without being told about them. */
export const DEFAULT_RELATIVE_DATES: AnyRelativeDateDefinition[] = [
	today,
	yesterday,
	thisWeek,
	thisMonth,
	lastMonth,
	thisYear,
	lastN,
	nextN
];
