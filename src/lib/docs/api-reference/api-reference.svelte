<script lang="ts">
	import { h2 as MarkdownH2 } from '$lib/components/mdsx';
	import type { Component } from './api-reference';
	import ReferenceTable from './reference-table.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let { reference }: { reference: { name: string; components: Record<string, Component<any>> } } =
		$props();
</script>

<MarkdownH2>API Reference</MarkdownH2>
{#each Object.values(reference.components) as component (component.name)}
	<ReferenceTable name={reference.name} {component} />
{/each}
