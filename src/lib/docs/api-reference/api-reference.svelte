<script lang="ts">
	import { page } from '$app/state';
	import { h2 as MarkdownH2 } from '$lib/components/mdsx';
	import type { Component } from './api-reference';
	import ReferenceTable from './reference-table.svelte';
	import { getReference } from './components';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	type RefBundle = { name: string; components: Record<string, Component<any>> };

	let { reference: referenceProp }: { reference?: RefBundle } = $props();

	function componentSlugFromPath(pathname: string): string | undefined {
		const m = pathname.match(/\/components\/([^/]+)/);
		return m?.[1];
	}

	const reference = $derived.by(() => {
		if (referenceProp) return referenceProp;
		const slug = componentSlugFromPath(page.url.pathname);
		return slug ? getReference(slug) : undefined;
	});
</script>

{#if reference}
	<MarkdownH2>API Reference</MarkdownH2>
	<div class="mt-8 flex flex-col gap-12">
		{#each Object.values(reference.components) as component (component.name ?? '_')}
			<ReferenceTable name={reference.name} {component} />
		{/each}
	</div>
{/if}
