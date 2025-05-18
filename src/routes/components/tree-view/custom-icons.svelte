<script lang="ts">
	import * as TreeView from '$lib/components/ui/tree-view';
	import * as Icons from '$lib/components/icons';
	import { FolderDotIcon, FolderOpenDotIcon } from '@lucide/svelte';
</script>

<div class="h-40 w-72">
	<TreeView.Root>
		<TreeView.Folder name=".github">
			{#snippet icon({ open })}
				{#if open}
					<FolderOpenDotIcon class="size-4" />
				{:else}
					<FolderDotIcon class="size-4" />
				{/if}
			{/snippet}
			<TreeView.Folder name="workflows"></TreeView.Folder>
		</TreeView.Folder>
		<TreeView.Folder name="src">
			<TreeView.Folder name="routes">
				<TreeView.File name="+layout.svelte">
					{#snippet icon({ name })}
						{#if name.endsWith('.svelte')}
							<Icons.Svelte class="size-4" />
						{/if}
					{/snippet}
				</TreeView.File>
				<TreeView.File name="+page.svelte">
					{#snippet icon({ name })}
						{#if name.endsWith('.svelte')}
							<Icons.Svelte class="size-4" />
						{/if}
					{/snippet}
				</TreeView.File>
			</TreeView.Folder>
			<TreeView.File name="app.css">
				{#snippet icon({ name })}
					{#if name.endsWith('.css')}
						<Icons.CSS class="size-3" />
					{/if}
				{/snippet}
			</TreeView.File>
			<TreeView.File name="hooks.server.ts">
				{#snippet icon({ name })}
					{#if name.endsWith('.ts')}
						<Icons.TypeScript class="size-3" />
					{/if}
				{/snippet}
			</TreeView.File>
		</TreeView.Folder>
	</TreeView.Root>
</div>
