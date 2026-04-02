---
title: "Confirm Delete Dialog"
description: "A dialog for confirming delete actions."
---

<script lang="ts">

	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="confirm-delete-dialog" />

## Installation

<Add item="confirm-delete-dialog" />

## Usage

```svelte
<script lang="ts">
	import { ConfirmDeleteDialog, confirmDelete } from '$lib/components/ui/confirm-delete-dialog';
</script>

<ConfirmDeleteDialog />

<button
	onclick={() => {
		confirmDelete({
			title: 'Delete',
			description: 'Are you sure you want to delete this item?',
			onConfirm: () => {
				console.log('Deleted!');
			}
		});
	}}
>
	Delete
</button>

```

## With Text Confirmation


Force the user to enter specific text to confirm the action.


<Demo demo="confirm-delete-dialog-with-text" />

## Skip Confirmation


Sometimes it's nice to give the user the ability to skip the confirmation. In this case you can set the `skipConfirmation` option to `true`.


<Demo demo="confirm-delete-dialog-skip-confirmation" />
