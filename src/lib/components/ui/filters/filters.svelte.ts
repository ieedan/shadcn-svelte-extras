import type { ReadableBoxedValues, WritableBoxedValues } from "svelte-toolbelt";
import {
    BOOLEAN_FILTER_OPERATORS,
    FilterFactoryBase,
    ID_FILTER_OPERATORS,
    NUMBER_FILTER_OPERATORS,
    STRING_FILTER_OPERATORS,
    type Filter,
    type FilterFactory,
    type FilterList,
    type FilterOperator,
} from "./types";
import { Context } from "runed";

export type FilterProviderProps = WritableBoxedValues<{
    filters: FilterList;
}> & ReadableBoxedValues<{
    factories: FilterFactory[]
}>

const FilterProviderCtx = new Context<FilterProviderState>('FilterProviderCtx');

export class FilterProviderState {
    constructor(readonly opts: FilterProviderProps) {

    }

    static create(opts: FilterProviderProps) {
        return FilterProviderCtx.set(new FilterProviderState(opts))
    }
}

export class FilterPillListState {
    constructor(readonly provider: FilterProviderState) {

    }

    static create() {
        return new FilterPillListState(FilterProviderCtx.get())
    }
}

export class FiltersClearButtonState {
    constructor(readonly provider: FilterProviderState) {

    }

    static create() {
        return new FiltersClearButtonState(FilterProviderCtx.get())
    }

    clear() {
        this.provider.opts.filters.current = [];
    }
}

const FilterPillCtx = new Context<FiltersPillState>('FilterPillCtx');

export type FiltersPillProps = WritableBoxedValues<{
    filter: Filter;
}>

export class FiltersPillState {
    private factory: FilterFactory | null = null;
    constructor(readonly opts: FiltersPillProps, readonly provider: FilterProviderState) {
        this.factory = this.provider.opts.factories.current.find(f => f.name === this.opts.filter.current.name) ?? null;
        if (!this.factory) {
            console.warn(`Filter factory ${this.opts.filter.current.name} not found`);
        }
    }

    static create(opts: FiltersPillProps) {
        return FilterPillCtx.set(new FiltersPillState(opts, FilterProviderCtx.get()))
    }

    remove() {
        this.provider.opts.filters.current = this.provider.opts.filters.current.filter(f => f.id !== this.opts.filter.current.id)
    }

    get operators(): FilterOperator[] {
        const filter = this.opts.filter.current;
        switch (filter.type) {
            case 'number':
                return [...NUMBER_FILTER_OPERATORS];
            case 'boolean':
                return [...BOOLEAN_FILTER_OPERATORS];
            case 'string':
                return [...STRING_FILTER_OPERATORS];
            case 'id':
                return [...ID_FILTER_OPERATORS];
        }
    }

    get valueOptions(): { id: string | number; label: string; description?: string }[] | null {
        const filter = this.opts.filter.current;
        switch (filter.type) {
            case 'number':
                return null;
            case 'boolean':
                return null;
            case 'string':
                return null;
            case 'id':
                if (!this.factory) return null;
                if (this.factory?.type !== 'id') {
                    console.warn(`Filter factory ${this.factory?.name} is not an id factory`);
                    return null;
                }
                return this.factory.valueOptions;
        }
    }
}

export class FiltersPillRemoveButtonState {
    constructor(readonly pillState: FiltersPillState) {

    }

    static create() {
        return new FiltersPillRemoveButtonState(FilterPillCtx.get())
    }

    remove() {
        this.pillState.remove()
    }
}
