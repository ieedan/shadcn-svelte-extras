---
title: "UseAutoScroll"
description: "A hook to enable the creation of containers that automatically scroll to the bottom of their content."
---

<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Add from '$lib/components/add.svelte';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n    import { UseAutoScroll } from '$lib/hooks/use-auto-scroll.svelte';\n\n    let { children } = $props();\n\n    const autoScroll = new UseAutoScroll();\n\\<\\/script\\>\n\n<div>\n    <div bind:this={autoScroll.ref}>\n        {@render children?.()}\n    </div>\n    {#if !autoScroll.isAtBottom}\n        <button onclick={() => autoScroll.scrollToBottom()}>\n            Scroll To Bottom\n        </button>\n    {/if}\n</div>";
</script>

<Subheading>Installation</Subheading>
<Add item="use-auto-scroll" />
<Subheading>Usage</Subheading>
<p>Create a container that automatically scrolls to the bottom.</p>
<Code
	lang="svelte"
	highlight={[2, 6, 10, 13, 14]}
	code={_docCode0}
/>
