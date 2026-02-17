<script lang="ts">
	import { TagsInput } from '$lib/components/ui/tags-input';

	const suggestions = ['Svelte', 'React', 'Vue', 'Angular', 'Solid', 'Ember', 'Next.js', 'Nuxt'];

	let value = $state<string[]>([]);
</script>

<div class="w-full p-6">
	<TagsInput bind:value placeholder="Add a framework" {suggestions} />
</div>
