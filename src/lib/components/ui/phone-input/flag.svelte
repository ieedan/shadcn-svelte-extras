<script lang="ts">
	import type { Country } from 'svelte-tel-input/types';
	import { hasFlag } from 'country-flag-icons';

	interface Props {
		country?: Country | null;
	}

	let { country = null }: Props = $props();

	async function getFlag(country: Country | null): Promise<string | null> {
		if (!country) return null;

		if (!hasFlag(country.iso2)) return null;

		const svg = await import('country-flag-icons/string/3x2');

		return svg[country.iso2] ?? null;
	}
</script>

<span
	class="bg-foreground/20 flex h-4 w-6 shrink-0 overflow-hidden rounded-sm [&>svg]:!h-4 [&>svg]:!w-6"
>
	{#await getFlag(country) then flag}
		{#if flag}
			{@html flag}
		{/if}
	{/await}
</span>
