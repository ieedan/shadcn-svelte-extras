---
title: "UsePromise"
description: "A hook to manage the state of a promise reactively in the absence of {#await}."
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="use-promise" />

## Installation

<Add item="use-promise" />

## Usage


Set a default value for the version until it is streamed back from the server.


```svelte {2,6,12}
<script lang="ts">
    import { UsePromise } from '$lib/hooks/use-promise.svelte.js';

    let { data } = $props();

    const version = new UsePromise(data.version, '1.x.x');
</script>

<!-- 1.x.x until resolved -->
<PMCommand
    command="execute"
    args={[\`jsrepo@\${version.current}\`, 'add', 'hooks/use-promise.svelte']}
/>
```

