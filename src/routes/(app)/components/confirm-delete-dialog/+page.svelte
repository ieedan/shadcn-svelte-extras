<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="confirm-delete-dialog" />
<Subheading>Installation</Subheading>
<Add item="confirm-delete-dialog" />
<Subheading>With Text Confirmation</Subheading>
<Demo demo="confirm-delete-dialog-with-text" />
<Subheading>Skip Confirmation</Subheading>
<p>
	Sometimes it's nice to give the user the ability to skip the confirmation. In this case you can
	set the <CodeSpan>skipConfirmation</CodeSpan> option to <CodeSpan>true</CodeSpan>.
</p>
<Demo demo="confirm-delete-dialog-skip-confirmation" />
