---
title: 'Split Button'
description: 'A primary action paired with a secondary action (for example, a menu).'
indicator: 'new'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="split-button" />

## Installation

<Add item="split-button" />

## Usage

```svelte
<script lang="ts">
	import { SplitButton } from '$lib/components/ui/split-button';
</script>

<SplitButton>
	<!-- Primary action and menu trigger -->
</SplitButton>
```

<ApiReference />
