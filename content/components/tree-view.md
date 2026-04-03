---
title: 'Tree View'
description: 'A file tree component.'
---

<script lang="ts">
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import treeViewFileCustomRaw from '$lib/docs/tree-view-file-custom.svelte?raw';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="tree-view" />

## Installation

<Add item="tree-view" />

## Custom Icons

<Demo demo="tree-view-custom-icons" />

If you are using custom icons in a project we recommend you wrap the folder/file components with
the custom icons:

<div>
	<Code lang="svelte" highlight={[[13, 21]]} code={treeViewFileCustomRaw} />
</div>

<ApiReference />
