<script lang="ts">
    import { FiltersClearButtonState } from "./filters.svelte.js";
    import type { Snippet } from "svelte";
    import type { ButtonProps } from "../button/button.svelte";
    import { mergeProps } from "bits-ui";
	import { Button } from "../button/index.js";

    let {
        children,
        child,
        variant = 'outline',
        size = 'sm',
        ...restProps
    }: ButtonProps & {
        child?: Snippet<[{props: Record<string, unknown>}]>
    } = $props();

    const state = FiltersClearButtonState.create();
    
    const mergedProps = $derived(mergeProps(restProps, { children, onclick: () => state.clear(), variant, size }));
</script>

{#if state.provider.opts.filters.current.length > 0}
    {#if child}
        {@render child?.({props: mergedProps})}
    {:else}
        <Button {...mergedProps}/>
    {/if}
{/if}
