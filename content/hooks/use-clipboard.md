---
title: "UseClipboard"
description: "A hook to simplify copying text to the clipboard."
---

<script lang="ts">
	import Add from '$lib/components/add.svelte';
</script>

## Installation

<Add item="use-clipboard" />

## Usage


Create a button that copies some text to the clipboard.


```svelte {2,6}
<script lang="ts">
    import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';

    let { children } = $props();

    const clipboard = new UseClipboard();
</script>

<button onclick={() => clipboard.copy('Hello, World!')}>
    {#if clipboard.copied}
        Copied!
    {:else}
        Copy
    {/if}
</button>
```

## Delay


So that you can show a status to your users `UseClipboard` delays resetting the state of `.copied`. By default this delay is set to 500ms.


```typescript {2,6}
const clipboard = new UseClipboard({ delay: 500 });
```

## Status


You can check `.status` to determine if the copy was a success or failure and update the state accordingly.


```svelte {2,6,10-16}
<script lang="ts">
    import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';

    let { children } = $props();

    const clipboard = new UseClipboard();
</script>

<button onclick={() => clipboard.copy('Hello, World!')}>
    {#if clipboard.status === 'success'}
        Copied!
    {:else if clipboard.status === 'failure'}
        Failed to copy!
    {:else}
        Copy
    {/if}
</button>
```

