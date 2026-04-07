---
title: 'Window'
description: 'A window component.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="window" />

## Installation

<Add item="window" />

## Usage

```svelte
<script lang="ts">
	import { Window } from '$lib/components/ui/window';
</script>

<Window>
	<p>Window content</p>
</Window>
```

<ApiReference />
