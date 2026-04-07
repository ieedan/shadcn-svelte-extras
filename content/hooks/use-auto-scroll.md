---
title: 'UseAutoScroll'
description: 'A hook to enable the creation of containers that automatically scroll to the bottom of their content.'
---

<script lang="ts">
	import Add from '$lib/components/add.svelte';
</script>

## Installation

<Add item="use-auto-scroll" />

## Usage

Create a container that automatically scrolls to the bottom.

```svelte {2,6,10,13,14}
<script lang="ts">
	import { UseAutoScroll } from '$lib/hooks/use-auto-scroll.svelte';

	let { children } = $props();

	const autoScroll = new UseAutoScroll();
</script>

<div>
	<div bind:this={autoScroll.ref}>
		{@render children?.()}
	</div>
	{#if !autoScroll.isAtBottom}
		<button onclick={() => autoScroll.scrollToBottom()}> Scroll To Bottom </button>
	{/if}
</div>
```
