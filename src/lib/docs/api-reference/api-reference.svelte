<script lang="ts">
	import { Subheading } from '../../components/docs';
	import type { Component } from './api-reference';
	import ReferenceTable from './reference-table.svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let { name, components }: { name: string; components: Record<string, Component<any>> } = $props();
</script>

<Subheading>API Reference</Subheading>
{#each Object.values(components) as component (component.name)}
	<ReferenceTable {name} {component} />
{/each}
