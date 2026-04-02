---
title: "UseMedia"
description: "A hook to track the size of the screen using the standard Tailwind CSS breakpoints."
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="use-media" />

## Installation

<Add item="use-media" />

## Usage

```svelte {2,4}
<script lang="ts">
    import { useMedia } from '$lib/hooks/use-media.svelte';

    const media = useMedia();
</script>

{media.sm}

```

## Custom Breakpoints


You can also define your own breakpoints and get full type safety.


<Demo demo="use-media-custom" />
