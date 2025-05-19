<script lang="ts">
	import * as TreeView from '$lib/components/ui/tree-view';
</script>

<div class="border-border h-[825px] w-full border">
	<TreeView.Root class="p-4">
		<TreeView.Folder name=".github" open={false}>
			<TreeView.Folder name="workflows">
				<TreeView.File name="ci.yml" />
			</TreeView.Folder>
		</TreeView.Folder>
		<TreeView.Folder name=".svelte-kit" open={false} class="text-muted-foreground"
		></TreeView.Folder>
		<TreeView.Folder name="node_modules" open={false} class="text-muted-foreground">
			<TreeView.Folder name="bits-ui"></TreeView.Folder>
		</TreeView.Folder>
		<TreeView.Folder name="src">
			<TreeView.Folder name="lib">
				<TreeView.Folder name="components">
					<TreeView.Folder name="ui">
						<TreeView.Folder name="collapsible" open={false}></TreeView.Folder>
						<TreeView.Folder name="tree-view" open={false}></TreeView.Folder>
					</TreeView.Folder>
				</TreeView.Folder>
				<TreeView.Folder name="utils">
					<TreeView.File name="utils.ts" />
				</TreeView.Folder>
			</TreeView.Folder>
			<TreeView.Folder name="routes">
				<TreeView.File name="+layout.svelte" />
				<TreeView.File name="+page.svelte" />
			</TreeView.Folder>
			<TreeView.File name="app.css" />
			<TreeView.File name="app.d.ts" />
			<TreeView.File name="app.html" />
		</TreeView.Folder>
		<TreeView.Folder name="static" open={false}>
			<TreeView.File name="favicon.png" />
		</TreeView.Folder>
		<TreeView.File name=".gitignore" />
		<TreeView.File name=".npmrc" />
		<TreeView.File name=".prettierignore" />
		<TreeView.File name=".prettierrc" />
		<TreeView.File name="components.json" />
		<TreeView.File name="eslint.config.js" />
		<TreeView.File name="LICENSE" />
		<TreeView.File name="package.json" />
		<TreeView.File name="pnpm-lock.yaml" />
		<TreeView.File name="postcss.config.js" />
		<TreeView.File name="README.md" />
		<TreeView.File name="svelte.config.js" />
		<TreeView.File name="tsconfig.json" />
		<TreeView.File name="vite.config.ts" />
		<TreeView.File name="tailwind.config.ts" />
	</TreeView.Root>
</div>
