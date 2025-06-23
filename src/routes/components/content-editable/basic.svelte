<script lang="ts">
	import * as ContentEditable from '$lib/components/ui/content-editable';

	let value = $state('');
</script>

<div class="w-[250px]">
	<ContentEditable.Root
		this="p"
		onValueCommit={(v) => console.log('value commit', v)}
		onEditingChange={(v) => console.log('editing', v)}
		bind:value
	>
		Something
	</ContentEditable.Root>
	<span>Value: {value}</span>
</div>
