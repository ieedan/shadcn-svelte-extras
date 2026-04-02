---
title: "UseFrecency"
description: "A hook to track and sort items based on their frequency of use."
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="use-frecency" />

## Installation

<Add item="use-frecency" />

## Usage

```svelte {2,4}
<script lang="ts">
    import { UseFrecency } from '$lib/hooks/use-frecency.svelte.js';

    const frecency = new UseFrecency('frecency-key');
</script>

<p>{frecency.items}</p>
```

