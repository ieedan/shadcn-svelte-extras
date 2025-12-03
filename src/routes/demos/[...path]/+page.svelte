<script lang="ts">
	import Delayed from '$lib/components/delayed.svelte';
	import { Spinner } from '$lib/components/ui/spinner/index.js';

	let { data } = $props();

	const ComponentPromise = import(`$lib/demos/${data.path}.svelte`);
</script>

<div class="flex min-h-svh place-items-center justify-center">
	{#await ComponentPromise}
		<!-- delay the loading state just a bit to make it seem faster -->
		<Delayed delay={1000}>
			<span class="text-muted-foreground flex items-center gap-2">
				<Spinner /> Loading...
			</span>
		</Delayed>
	{:then { default: Component }}
		<Component />
	{/await}
</div>
