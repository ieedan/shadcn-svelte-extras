<script lang="ts">
	import Delayed from '$lib/components/delayed.svelte';
	import { Spinner } from '$lib/components/ui/spinner/index.js';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { MinimizeIcon } from '@lucide/svelte';

	let { data } = $props();

	const ComponentPromise = import(`$lib/demos/${data.path}.svelte`);

	const from = $derived(page.url.searchParams.get('from'));
</script>

<div class="flex min-h-dvh place-items-center justify-center">
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
{#if from !== null}
	<div class="fixed top-4 right-4">
		<Button href={from} size="icon" variant="ghost">
			<MinimizeIcon />
		</Button>
	</div>
{/if}
