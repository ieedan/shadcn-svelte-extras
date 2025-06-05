<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Code from '$lib/components/docs/code.svelte';
</script>

<Installation specifier="hooks/use-auto-scroll.svelte" />
<Subheading>Usage</Subheading>
<p>Create a container that automatically scrolls to the bottom.</p>
<Code
	lang="svelte"
	highlight={[2, 6, 10, 13, 14]}
	code={`\<script lang="ts"\>
    import { UseAutoScroll } from '$lib/hooks/use-auto-scroll.svelte';

    let { children } = $props();

    const autoScroll = new UseAutoScroll();
\<\/script\>

<div>
    <div bind:this={autoScroll.ref}>
        {@render children?.()}
    </div>
    {#if !autoScroll.isAtBottom}
        <button onclick={() => autoScroll.scrollToBottom()}>
            Scroll To Bottom
        </button>
    {/if}
</div>`}
/>
