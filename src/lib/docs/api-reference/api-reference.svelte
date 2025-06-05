<script lang="ts">
	import { Subheading } from '../../components/docs';
	import type { Component } from './api-reference';
	import ReferenceTable from './reference-table.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let { reference }: { reference: { name: string; components: Record<string, Component<any>> } } =
		$props();
</script>

<Subheading>API Reference</Subheading>
{#each Object.values(reference.components) as component (component.name)}
	<ReferenceTable name={reference.name} {component} />
{/each}
