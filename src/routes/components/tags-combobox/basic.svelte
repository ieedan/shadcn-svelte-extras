<script lang="ts">
	import { TagsCombobox } from '$lib/components/ui/tags-combobox';
	import type { TagsComboboxOption } from '$lib/components/ui/tags-combobox/types';

	let value = $state(['Svelte', 'TypeScript']);

	const frameworks: TagsComboboxOption[] = [
		{ value: 'svelte', label: 'Svelte' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'react', label: 'React' },
		{ value: 'angular', label: 'Angular' },
		{ value: 'solid', label: 'Solid' },
		{ value: 'qwik', label: 'Qwik' }
	];

	const languages: TagsComboboxOption[] = [
		{ value: 'typescript', label: 'TypeScript' },
		{ value: 'javascript', label: 'JavaScript' },
		{ value: 'python', label: 'Python' },
		{ value: 'rust', label: 'Rust' },
		{ value: 'go', label: 'Go' },
		{ value: 'java', label: 'Java' }
	];

	// Combine frameworks and languages
	const options = [...frameworks, ...languages];
</script>

<div class="w-full p-6">
	<TagsCombobox bind:value {options} placeholder="Add a tag or select from list" />
</div>
