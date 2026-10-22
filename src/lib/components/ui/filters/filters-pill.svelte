<script lang="ts">
    import { FiltersPillState } from "./filters.svelte.js";
    import type { HTMLAttributes } from "svelte/elements";
    import type { Filter, FilterOperator, FilterValueOption } from "./types.js";
    import { cn } from "$lib/utils.js";
    import { box } from "svelte-toolbelt";
	import type { Snippet } from "svelte";

    type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
        filter: Filter;
        children: Snippet<[{ operators: FilterOperator[], valueOptions: FilterValueOption[] | null }]>;
    }

    let { filter = $bindable(), children, class: className, ...restProps }: Props = $props();

    const pillState = FiltersPillState.create({ filter: box.with(() => filter, (value) => filter = value) });
</script>

<div class={cn('', className)} {...restProps}>
    {@render children?.({ operators: pillState.operators, valueOptions: pillState.valueOptions })}
</div>
