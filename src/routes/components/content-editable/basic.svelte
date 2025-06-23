<script lang="ts">
	import * as ContentEditable from '$lib/components/ui/content-editable';

	let value = $state('');
	let editing = $state(false);
</script>

<div class="w-[250px] flex flex-col gap-2">
	<ContentEditable.Root
		this="p"
		onValueCommit={(v) => console.log('value commit', v)}
		onEditingChange={(v) => console.log('editing', v)}
		bind:value
		bind:editing
	>
		Something
	</ContentEditable.Root>
	<span>Value: {value}</span>
	<span>Editing: {editing}</span>
</div>
