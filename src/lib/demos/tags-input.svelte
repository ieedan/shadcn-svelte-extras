<script lang="ts">
	import { TagsInput } from '$lib/components/ui/tags-input';

	let value = $state(['Svelte', 'jsrepo']);
</script>

<div class="w-full p-6">
	<TagsInput bind:value placeholder="Add a tag" />
</div>
