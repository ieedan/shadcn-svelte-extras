---
title: 'Snippet'
description: 'A snippet component.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="snippet" />

## Installation

<Add item="snippet" />

## Usage

```svelte
<script lang="ts">
	import { Snippet } from '$lib/components/ui/snippet';
</script>

<Snippet text="npx jsrepo add ui/snippet" />
```

## Variants

<Demo demo="snippet-variants" />

## Multiline

<Demo demo="snippet-multiline" />

<ApiReference />
