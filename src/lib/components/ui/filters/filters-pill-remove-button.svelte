<script lang="ts">
    import { FiltersPillRemoveButtonState } from "./filters.svelte.js";
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

    const state = FiltersPillRemoveButtonState.create();
    
    const mergedProps = $derived(mergeProps(restProps, { children, onclick: () => state.remove(), variant, size }));
</script>

{#if child}
    {@render child?.({props: mergedProps})}
{:else}
    <Button {...mergedProps}/>
{/if}
