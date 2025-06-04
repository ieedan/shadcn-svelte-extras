<script lang="ts">
	import { Subheading } from '..';
	import type { Component } from './api-reference';
	import ReferenceTable from './reference-table.svelte';

	let { name, components }: { name: string; components: Record<string, Component<any>> } = $props();
</script>

<Subheading>API Reference</Subheading>
{#each Object.values(components) as component}
	<ReferenceTable {name} {component} />
{/each}
