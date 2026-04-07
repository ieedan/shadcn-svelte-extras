---
title: 'Active'
description: 'An action to determine if a link is active.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

Adds a `data-active` attribute to the `<a/>` tag to be used for styling.

<Demo demo="active" />

## Installation

<Add item="active" />

## Usage

```svelte
<!-- Use data-[active=true] and data-[active=false] to style the link -->
<a href="/docs" use:active class="data-[active=true]:bg-secondary"> Link </a>
```

## Attachment Usage

```svelte
<!-- Use data-[active=true] and data-[active=false] to style the link -->
<a href="/docs" {...attachActive()} class="data-[active=true]:bg-secondary"> Link </a>
```
