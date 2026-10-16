<script lang="ts">
	import type { Snippet } from "svelte";
    import { FilterPillListState } from "./filters.svelte.js";
	import type { FilterList } from "./types.js";
    import type { HTMLAttributes } from "svelte/elements";
    import { cn } from "$lib/utils.js";

    type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
        children?: Snippet<[{ filters: FilterList }]>
    }

    let { children, class: className, ...restProps }: Props = $props();

    const state = FilterPillListState.create();
</script>

<div class={cn('', className)} {...restProps}>
    {@render children?.({ filters: state.provider.opts.filters.current })}
</div>
