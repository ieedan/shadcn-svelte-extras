---
title: "IsMac"
description: "A hook to determine if the user is on a Mac."
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="is-mac" />

## Installation

<Add item="is-mac" />

## Usage

```svelte {2,5}
<script lang="ts">
    import { isMac } from '$lib/hooks/is-mac.svelte.js';
</script>

<p>{isMac ? 'Mac' : 'Not Mac'}</p>
```

## Keys


Often times you'll want to show modifier keys in your UI. You can do this with the exported
	`cmdOrCtrl` and `optionOrAlt` variables.


<Demo demo="is-mac-keys" />

## Acknowledgements


This hook is based on the shadcn-svelte [useIsMac](https://github.com/huntabyte/shadcn-svelte/blob/main/docs/src/lib/hooks/use-is-mac.svelte.ts) hook, as well as some useful enhancements by [Thomas G. Lopes](https://github.com/tglide).


