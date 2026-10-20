import type { DateValue } from "@internationalized/date";
import { nanoid } from "nanoid";

export const FILTER_OPERATORS_MAP = {
    '=': 'equals',
    '!=': 'does not equal',
    '>': 'greater than',
    '<': 'less than',
    '>=': 'greater than or equal to',
    '<=': 'less than or equal to',
    '*a': 'starts with',
    '!*a': 'does not start with',
    'a*': 'ends with',
    '!a*': 'does not end with',
    '*a*': 'contains',
    '!*a*': 'does not contain',
    'b<=a<=c': 'between',
    '!b<=a<=c': 'not between',
} as const;

export type FilterOperator = keyof typeof FILTER_OPERATORS_MAP;

export type FilterOperatorLabel = (typeof FILTER_OPERATORS_MAP)[FilterOperator];

interface IFilter<Type, Value, Operators extends FilterOperator> {
    type: Type;
    /** The name of the field to filter on. */
    name: string;
    /** The unique id of the filter used to operate on it */
    id: string;
    operator: Operators;
    value: Value;
}

export const NUMBER_FILTER_OPERATORS = ['=', '!=', '>', '<', '>=', '<='] as const satisfies readonly FilterOperator[];
export const BOOLEAN_FILTER_OPERATORS = ['=', '!='] as const satisfies readonly FilterOperator[];
export const STRING_FILTER_OPERATORS = ['*a', '!*a', 'a*', '!a*', '*a*', '!*a*', '=', '!='] as const satisfies readonly FilterOperator[];
export const ID_FILTER_OPERATORS = ['=', '!='] as const satisfies readonly FilterOperator[];
export const DATE_FILTER_OPERATORS = ['=', '!=', '>', '<', '>=', '<=', 'b<=a<=c', '!b<=a<=c'] as const satisfies readonly FilterOperator[];

export type NumberOperator = (typeof NUMBER_FILTER_OPERATORS)[number];
export type BooleanOperator = (typeof BOOLEAN_FILTER_OPERATORS)[number];
export type StringOperator = (typeof STRING_FILTER_OPERATORS)[number];
export type IdOperator = (typeof ID_FILTER_OPERATORS)[number];
export type DateOperator = (typeof DATE_FILTER_OPERATORS)[number];

export type NumberFilter = IFilter<'number', number, NumberOperator>;

export type BooleanFilter = IFilter<'boolean', boolean, BooleanOperator>;

export type StringFilter = IFilter<'string', string, StringOperator>;

export type IdFilter = IFilter<'id', string | number, IdOperator>;

/**
 * DateValue for a set date, [DateValue, DateValue] for a date range, or a string for a relative date
 */
export type DateFilter = IFilter<'date', DateValue | [DateValue, DateValue] | string, DateOperator>;

export type FilterTypes = {
    'number': NumberFilter;
    'boolean': BooleanFilter;
    'string': StringFilter;
    'id': IdFilter;
    'date': DateFilter;
}

export type Filter = NumberFilter | BooleanFilter | StringFilter | IdFilter | DateFilter;

export type FilterGroup = { type: 'group', operator: 'and' | 'or', filters: (Filter | FilterGroup)[] };

export type FilterList = Filter[];

export type FilterFactory = NumberFilterFactory | BooleanFilterFactory | StringFilterFactory | IdFilterFactory | DateFilterFactory;

export function createFilter<Type extends keyof FilterTypes>(
    type: Type,
    name: string,
    operator: FilterTypes[Type]['operator'],
    value: FilterTypes[Type]['value'],
): FilterTypes[Type] {
    return {
        type,
        name,
        id: FilterFactoryBase.generateId(),
        operator,
        value,
    };
}

export abstract class FilterFactoryBase<Type extends keyof FilterTypes> {
    constructor(public readonly name: string, public readonly type: Type) {

    }

    create(operator: FilterTypes[Type]['operator'], value: FilterTypes[Type]['value']): FilterTypes[Type] {
        return createFilter(this.type, this.name, operator, value);
    }

    static generateId() {
        return nanoid();
    }
}

export class NumberFilterFactory extends FilterFactoryBase<'number'> {
    constructor(readonly name: string) {
        super(name, 'number');
    }
}

export class BooleanFilterFactory extends FilterFactoryBase<'boolean'> {
    constructor(readonly name: string) {
        super(name, 'boolean');
    }
}

export class StringFilterFactory extends FilterFactoryBase<'string'> {
    constructor(readonly name: string) {
        super(name, 'string');
    }
}

export class IdFilterFactory extends FilterFactoryBase<'id'> {
    constructor(readonly name: string, readonly valueOptions: { id: string | number; label: string; description?: string }[]) {
        super(name, 'id');
    }
}

export class DateFilterFactory extends FilterFactoryBase<'date'> {
    constructor(readonly name: string, readonly relativeOptions: { id: string; label: string; }[] = []) {
        super(name, 'date');
    }
}
