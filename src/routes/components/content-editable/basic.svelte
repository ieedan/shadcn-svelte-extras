<script lang="ts">
	import * as ContentEditable from '$lib/components/ui/content-editable';

	let value = $state('');
	let editing = $state(true);
</script>

<div class="flex w-[250px] flex-col gap-2">
	<ContentEditable.Root
		onValueCommit={(v) => console.log('value commit', v)}
		onEditingChange={(v) => console.log('editing', v)}
		bind:value
		bind:editing
	>
		<ContentEditable.Content this="p">Something</ContentEditable.Content>
		<ContentEditable.Trigger>Edit</ContentEditable.Trigger>
		<ContentEditable.Cancel>Cancel</ContentEditable.Cancel>
	</ContentEditable.Root>
	<span>Value: {value}</span>
	<span>Editing: {editing}</span>
</div>
