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

export type NumberOperator = (typeof NUMBER_FILTER_OPERATORS)[number];
export type BooleanOperator = (typeof BOOLEAN_FILTER_OPERATORS)[number];
export type StringOperator = (typeof STRING_FILTER_OPERATORS)[number];
export type IdOperator = (typeof ID_FILTER_OPERATORS)[number];

export type NumberFilter = IFilter<'number', number, NumberOperator>;

export type BooleanFilter = IFilter<'boolean', boolean, BooleanOperator>;

export type StringFilter = IFilter<'string', string, StringOperator>;

export type IdFilter = IFilter<'id', string | number, IdOperator>;

export type FilterTypes = {
    'number': NumberFilter;
    'boolean': BooleanFilter;
    'string': StringFilter;
    'id': IdFilter;
}

export type Filter = NumberFilter | BooleanFilter | StringFilter | IdFilter;

export type FilterGroup = { type: 'group', operator: 'and' | 'or', filters: (Filter | FilterGroup)[] };

export type FilterList = Filter[];

export type FilterFactory = NumberFilterFactory | BooleanFilterFactory | StringFilterFactory | IdFilterFactory;

export abstract class FilterFactoryBase<Type extends keyof FilterTypes> {
    constructor(public readonly name: string, public readonly type: Type) {

    }

    abstract create(operator: FilterTypes[Type]['operator'], value: FilterTypes[Type]['value']): FilterTypes[Type];
}

export class NumberFilterFactory extends FilterFactoryBase<'number'> {
    constructor(readonly name: string) {
        super(name, 'number');
    }

    create(operator: NumberFilter['operator'], value: NumberFilter['value']) {
        return createNumberFilter(this.name, operator, value)
    }
}

function generateId() {
    return nanoid();
}

export function createNumberFilter(name: string, operator: NumberFilter['operator'], value: NumberFilter['value']): NumberFilter {
    return {
        type: 'number',
        name: name,
        id: generateId(),
        operator,
        value,
    }
}

export class BooleanFilterFactory extends FilterFactoryBase<'boolean'> {
    constructor(readonly name: string) {
        super(name, 'boolean');
    }

    create(operator: BooleanFilter['operator'], value: BooleanFilter['value']) {
        return createBooleanFilter(this.name, operator, value)
    }
}

export function createBooleanFilter(name: string, operator: BooleanFilter['operator'], value: BooleanFilter['value']): BooleanFilter {
    return {
        type: 'boolean',
        name: name,
        id: generateId(),
        operator,
        value,
    }
}

export class StringFilterFactory extends FilterFactoryBase<'string'> {
    constructor(readonly name: string) {
        super(name, 'string');
    }

    create(operator: StringFilter['operator'], value: StringFilter['value']) {
        return createStringFilter(this.name, operator, value)
    }
}

export function createStringFilter(name: string, operator: StringFilter['operator'], value: StringFilter['value']): StringFilter {
    return {
        type: 'string',
        name: name,
        id: generateId(),
        operator,
        value,
    }
}

export class IdFilterFactory extends FilterFactoryBase<'id'> {
    constructor(readonly name: string, readonly valueOptions: { id: string | number; label: string; description?: string }[]) {
        super(name, 'id');
    }

    create(operator: IdFilter['operator'], value: IdFilter['value']) {
        return createIdFilter(this.name, operator, value)
    }
}

export function createIdFilter(name: string, operator: IdFilter['operator'], value: IdFilter['value']): IdFilter {
    return {
        type: 'id',
        name: name,
        id: generateId(),
        operator,
        value,
    }
}
