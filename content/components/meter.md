---
title: "Meter"
description: "A meter component."
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="meter" />

## Installation

<Add item="meter" />

## Usage

```svelte
<script lang="ts">
	import { Meter } from '$lib/components/ui/meter';
</script>

<Meter
	value={50}
	max={100}
/>
```

