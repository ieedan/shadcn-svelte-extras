---
title: "Confirm Delete Dialog"
description: "A dialog for confirming delete actions."
---

<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n\timport { ConfirmDeleteDialog, confirmDelete } from '$lib/components/ui/confirm-delete-dialog';\n\\<\\/script\\>\n\n<ConfirmDeleteDialog />\n\n<button\n\tonclick={() => {\n\t\tconfirmDelete({\n\t\t\ttitle: 'Delete',\n\t\t\tdescription: 'Are you sure you want to delete this item?',\n\t\t\tonConfirm: () => {\n\t\t\t\tconsole.log('Deleted!');\n\t\t\t}\n\t\t});\n\t}}\n>\n\tDelete\n</button>\n";
</script>

<Demo demo="confirm-delete-dialog" />
<Subheading>Installation</Subheading>
<Add item="confirm-delete-dialog" />
<Subheading>Usage</Subheading>
<Code
	lang="svelte"
	code={_docCode0}
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
