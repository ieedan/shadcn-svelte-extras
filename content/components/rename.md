---
title: "Rename"
description: "A component for renaming stuff."
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="rename" />

## Installation

<Add item="rename" />

## Usage

```svelte
<script lang="ts">
	import * as Rename from '$lib/components/ui/rename';
</script>

<Rename.Provider>
	<Rename.Root />
	<Rename.Save />
	<Rename.Cancel />
	<Rename.Edit />
</Rename.Provider>

<!-- or -->

<!-- Content editable mode -->
<Rename.Root />

```

## Content Editable


When in content editable mode the user can click on the text to start editing it.


<Demo demo="rename-content-editable" />

## Text Area


The `Rename` component can also be a `textarea` by setting the `inputTag` prop to `'textarea'`.


<Demo demo="rename-text-area" />

## External Control


You can put the `Rename` component into edit mode by using the `Edit` component or by setting the `mode` prop to `'edit'`.


<Demo demo="rename-context-menu" />
