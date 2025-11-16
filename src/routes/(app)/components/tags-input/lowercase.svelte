<script lang="ts">
	import { TagsInput } from '$lib/components/ui/tags-input';
	import { customValidate } from './custom-validate';

	let value = $state(['svelte', 'jsrepo']);
</script>

<div class="w-full p-6">
	<TagsInput bind:value placeholder="Add a tag" validate={customValidate} />
</div>
