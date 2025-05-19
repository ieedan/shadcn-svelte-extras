<script lang="ts">
	import type { Country } from 'svelte-tel-input/types';

	interface Props {
		country?: Country | null;
	}

	let { country = null }: Props = $props();
</script>

<span class="bg-foreground/20 flex h-4 w-6 shrink-0 overflow-hidden rounded-sm">
	{#if country}
		<span
			aria-label="{country.name} flag."
			class="flag flag-{country.iso2.toLowerCase()} mr-3 shrink-0"
		></span>
	{/if}
</span>
