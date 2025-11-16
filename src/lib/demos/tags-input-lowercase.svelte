<script lang="ts">
	import { TagsInput } from '$lib/components/ui/tags-input';
	import type { TagsInputProps } from '$lib/components/ui/tags-input/types';

	const customValidate: TagsInputProps['validate'] = (val, tags) => {
		// trim and convert to lowercase
		const transformed = val.trim().toLowerCase();

		// disallow empties
		if (transformed.length === 0) return undefined;

		// disallow duplicates
		if (tags.find((t) => transformed === t.toLowerCase())) return undefined;

		return transformed;
	};

	let value = $state(['svelte', 'jsrepo']);
</script>

<div class="w-full p-6">
	<TagsInput bind:value placeholder="Add a tag" validate={customValidate} />
</div>

