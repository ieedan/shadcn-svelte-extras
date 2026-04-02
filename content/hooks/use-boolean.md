---
title: "UseBoolean"
description: "A hook to simplify working with boolean values."
---

<script lang="ts">
	import Add from '$lib/components/add.svelte';
</script>

## Installation

<Add item="use-boolean" />

## Usage


Use this hook to manage boolean values with more concise syntax.


Before:


```svelte
<script lang="ts">
    let enabled = $state(true);
</script>

<button onclick={() => enabled = false}>
    Disable
</button>
```



After:


```svelte {2,4,7}
<script lang="ts">
    import { UseBoolean } from '$lib/hooks/use-boolean.svelte';

    const enabled = new UseBoolean(true);
</script>

<button onclick={enabled.setFalse}>
    Disable
</button>
```

## Acknowledgements


This hook was inspired by [strlrd-29/hookcn](https://hookcn.ouassim.tech/docs/hooks/use-boolean).


