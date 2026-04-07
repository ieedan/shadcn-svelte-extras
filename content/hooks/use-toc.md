---
title: 'UseToc'
description: 'A hook used to generate a table of contents based on the page content'
---

<script lang="ts">
	import Add from '$lib/components/add.svelte';
</script>

## Installation

<Add item="use-toc" />

## Usage

Generate a table of contents using the content of the page.

```svelte {2,5}
<script lang="ts">
	const toc = new UseToc();
</script>

<div bind:this={toc.ref}>
	<h2>Installation</h2>
	<h3>CLI</h3>
	<h3>Manual</h3>
	<h2>Usage</h2>
</div>
```

## Ignoring Headings

You can exclude headings from the table of contents by adding the <code>data-toc-ignore</code> attribute
to the heading itself or to any parent element containing the heading.

```svelte {2,5,8,10}
<script lang="ts">
	const toc = new UseToc();
</script>

<div bind:this={toc.ref}>
	<h2>Installation</h2>
	<h3>CLI</h3>
	<h3 data-toc-ignore>Internal Notes</h3>
	<h2>Usage</h2>
	<div data-toc-ignore>
		<h3>Hidden Section</h3>
		<h4>This won't appear</h4>
	</div>
</div>
```
