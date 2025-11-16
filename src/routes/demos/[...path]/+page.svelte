<script lang="ts">
	import { Spinner } from '$lib/components/ui/spinner/index.js';

	let { data } = $props();

	const ComponentPromise = import(`$lib/demos/${data.path}.svelte`);
</script>

<div class="flex min-h-svh place-items-center justify-center">
	{#await ComponentPromise}
		<span class="flex items-center gap-2 text-muted-foreground"><Spinner/> Loading...</span>
	{:then { default: Component }}
		<Component />
	{/await}
</div>
