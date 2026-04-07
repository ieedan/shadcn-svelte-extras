---
title: 'Number Field'
description: 'A component for incrementing and decrementing a value.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="number-field" />

## Installation

<Add item="number-field" />

## Usage

```svelte
<script lang="ts">
	import * as NumberField from '$lib/components/ui/number-field';
</script>

<NumberField.Root>
	<NumberField.Group>
		<NumberField.Decrement />
		<NumberField.Input />
		<NumberField.Increment />
	</NumberField.Group>
</NumberField.Root>
```

## Composition

Use the following composition to build a `NumberField`:

```text
NumberField.Root
└── NumberField.Group
    ├── NumberField.Decrement
    ├── NumberField.Input
    └── NumberField.Increment
```

## Step

Use the `step` prop to increment or decrement the value by a specific amount, in
this case 100.

<Demo demo="number-field-step" />

<ApiReference />
