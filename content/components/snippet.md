---
title: 'Snippet'
description: 'A component for showing a short, copyable, command or phrase.'
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

It defaults to `outline` but can also be `primary`, `secondary`, or `destructive.` 

<Demo demo="snippet-variants" />

## Multiline

You can have multiple lines for multiple commands.

<Demo demo="snippet-multiline" />

## Overflow

It also handles overflows nicely, allowing users to scroll the text, and showing them faded edges where there is more to see (in supported browsers).

<Demo demo="snippet-overflow" />

<ApiReference />
