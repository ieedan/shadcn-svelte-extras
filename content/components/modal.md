---
title: "Modal"
description: "A responsive dialog component."
---

<script lang="ts">

	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="modal" />

## Installation

<Add item="modal" />

## Usage


The modal component can be composed just like a dialog or drawer component.


```svelte
<script lang="ts">
	import * as Modal from "$lib/components/ui/modal";
</script>

<Modal.Root>
	<Modal.Trigger/>
	<Modal.Content>
		<Modal.Header>
			<Modal.Title/>
			<Modal.Description/>
		</Modal.Header>
		<Modal.Footer/>
	</Modal.Content>
</Modal.Root>
```

