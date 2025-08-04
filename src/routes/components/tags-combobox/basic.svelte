<script lang="ts">
	import { TagsCombobox } from '$lib/components/ui/tags-combobox';

	let value = $state(['Svelte', 'jsrepo']);
</script>

<div class="w-full p-6">
	<TagsCombobox bind:value placeholder="Add a tag" />
</div>
