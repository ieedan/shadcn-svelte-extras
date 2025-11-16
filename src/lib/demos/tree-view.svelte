<script lang="ts">
	import * as TreeView from '$lib/components/ui/tree-view';
</script>

<div class="h-40 w-72">
	<TreeView.Root>
		<TreeView.Folder name="src">
			<TreeView.Folder name="routes">
				<TreeView.File name="+layout.svelte" />
				<TreeView.File name="+page.svelte" />
			</TreeView.Folder>
			<TreeView.File name="app.css" />
			<TreeView.File name="hooks.server.ts" />
		</TreeView.Folder>
	</TreeView.Root>
</div>
