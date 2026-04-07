---
title: 'Typewriter'
description: 'A Svelte transition and attachment that reveals text character by character.'
---

<script lang="ts">
	import Add from '$lib/components/add.svelte';
</script>

## Installation

<Add item="typewriter" />

## Usage

### Transition

Use as a transition on an element whose full text is already in the DOM; the transition progressively reveals it.

```svelte
<script lang="ts">
	import { typewriter } from '$lib/actions/typewriter.svelte';
	import { fade } from 'svelte/transition';
</script>

{#key show}
	<p in:typewriter={{ speed: 0.8, delay: 200 }} out:fade>This text types out when shown.</p>
{/key}
```

### Attachment

For Svelte 5 attachments, use `attachTypewriter` so the effect applies when the node is mounted.

```svelte
<script lang="ts">
	import { attachTypewriter } from '$lib/actions/typewriter.svelte';
</script>

<p {...attachTypewriter({ speed: 1, delay: 0 })}>Hello, world!</p>
```

Options: `speed` (higher = faster), `delay` (ms before starting), and optional `onComplete` when the full string is visible.
