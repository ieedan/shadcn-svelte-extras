<script lang="ts">
	import { TreeViewFile } from '$lib/components/ui/tree-view';
	import * as Icons from '$lib/components/icons';

	type Props = {
		name: string;
	};

	let { name }: Props = $props();
</script>

<TreeViewFile {name}>
	{#snippet icon({ name })}
		{#if name.endsWith('.css')}
			<Icons.CSS class="size-3" />
		{:else if name.endsWith('.svelte')}
			<Icons.Svelte class="size-4" />
		{:else if name.endsWith('.ts')}
			<Icons.TypeScript class="size-3" />
		{/if}
	{/snippet}
</TreeViewFile>
