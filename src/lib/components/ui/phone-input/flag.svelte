<script lang="ts">
	import type { Country } from 'svelte-tel-input/types';
	import { getFlag } from './flags';

	interface Props {
		country?: Country | null;
	}

	let { country = null }: Props = $props();
</script>

<span
	class="bg-foreground/20 flex h-4 w-6 shrink-0 overflow-hidden rounded-sm [&>svg]:h-4! [&>svg]:w-6!"
>
	{#await getFlag(country) then flag}
		{#if flag}
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html flag}
		{/if}
	{/await}
</span>
