<script lang="ts">
	import { TagsCombobox } from '$lib/components/ui/tags-combobox';
	import type { TagsComboboxOption } from '$lib/components/ui/tags-combobox/types';

	let value = $state(['Svelte', 'TypeScript']);

	const frameworks: TagsComboboxOption[] = [
		{ value: 'Svelte', label: 'Svelte' },
		{ value: 'Vue', label: 'Vue' },
		{ value: 'React', label: 'React' },
		{ value: 'Angular', label: 'Angular' },
		{ value: 'Solid', label: 'Solid' },
		{ value: 'Qwik', label: 'Qwik' }
	];

	const languages: TagsComboboxOption[] = [
		{ value: 'TypeScript', label: 'TypeScript' },
		{ value: 'JavaScript', label: 'JavaScript' },
		{ value: 'Python', label: 'Python' },
		{ value: 'Rust', label: 'Rust' },
		{ value: 'Go', label: 'Go' },
		{ value: 'Java', label: 'Java' }
	];

	// Combine frameworks and languages
	const options = [...frameworks, ...languages];
</script>

<div class="w-full p-6">
	<TagsCombobox bind:value {options} placeholder="Add a tag or select from list" />
</div>
