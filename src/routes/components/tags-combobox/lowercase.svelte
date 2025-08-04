<script lang="ts">
	import { TagsCombobox } from '$lib/components/ui/tags-combobox';
	import { customValidate } from './custom-validate';

	let value = $state(['svelte', 'jsrepo']);
</script>

<div class="w-full p-6">
	<TagsCombobox bind:value placeholder="Add a tag" validate={customValidate} />
</div>
