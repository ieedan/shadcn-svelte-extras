---
title: 'Field Set'
description: 'A field set component.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="field-set" />

## Installation

<Add item="field-set" />

## Usage

```svelte
<script lang="ts">
	import * as FieldSet from '$lib/components/ui/field-set';
</script>

<FieldSet.Root>
	<FieldSet.Content>
		<!-- fields -->
	</FieldSet.Content>
	<FieldSet.Footer>
		<!-- actions -->
	</FieldSet.Footer>
</FieldSet.Root>
```

## Destructive

<Demo demo="field-set-destructive" />

<ApiReference />
