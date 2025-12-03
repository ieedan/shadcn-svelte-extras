<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="confirm-delete-dialog" />
<Subheading>Installation</Subheading>
<Add item="confirm-delete-dialog" />
<Subheading>Usage</Subheading>
<Code
	lang="svelte"
	code={`\<script lang="ts"\>
	import { ConfirmDeleteDialog, confirmDelete } from '$lib/components/ui/confirm-delete-dialog';
\<\/script\>

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
`}
/>
<Subheading>With Text Confirmation</Subheading>
<p>Force the user to enter specific text to confirm the action.</p>
<Demo demo="confirm-delete-dialog-with-text" />
<Subheading>Skip Confirmation</Subheading>
<p>
	Sometimes it's nice to give the user the ability to skip the confirmation. In this case you can
	set the <CodeSpan>skipConfirmation</CodeSpan> option to <CodeSpan>true</CodeSpan>.
</p>
<Demo demo="confirm-delete-dialog-skip-confirmation" />
