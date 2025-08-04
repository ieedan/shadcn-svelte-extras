<script lang="ts">
	import { TagsCombobox } from '$lib/components/ui/tags-combobox';
	import type { TagsComboboxOption } from '$lib/components/ui/tags-combobox/types';
	import { customValidate } from './custom-validate';

	let value = $state(['svelte', 'typescript']);

	const options: TagsComboboxOption[] = [
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'react', label: 'React' },
		{ value: 'typescript', label: 'TypeScript' },
		{ value: 'javascript', label: 'JavaScript' },
		{ value: 'python', label: 'Python' }
	];
</script>

<div class="w-full p-6">
	<TagsCombobox
		bind:value
		{options}
		placeholder="Add a tag (will be lowercase)"
		validate={customValidate}
	/>
</div>
