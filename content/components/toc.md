---
title: "Table of Contents"
description: "A component for displaying a table of contents."
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="toc" />

## Installation

<Add item="toc" />

## Usage

```svelte
<script lang="ts">
	import * as Toc from '$lib/components/ui/toc';
</script>

<Toc.Root />
```

## Generate the table of contents with UseToc

```svelte
<script lang="ts">
	import * as Toc from '$lib/components/ui/toc';

	const toc = new UseToc();
</script>

<div bind:this={toc.ref}>
	<!-- page contents -->
</div>
<Toc.Root toc={toc.current}/>
```

