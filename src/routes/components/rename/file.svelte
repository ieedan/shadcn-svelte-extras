<script lang="ts">
	import type { Doc } from './context-menu.svelte';
	import * as Rename from '$lib/components/ui/rename';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import FileIcon from '@lucide/svelte/icons/file';
	import * as Icons from '$lib/components/icons';

	let {
		document = $bindable(),
		checkUnique = $bindable()
	}: { document: Doc; checkUnique: (name: string) => boolean } = $props();

	let renameMode = $state<'view' | 'edit'>('view');

	function validateName(name: string) {
		if (name.trim() === '') return false;
		return checkUnique(name);
	}
</script>

<Rename.Provider>
	<ContextMenu.Root>
		<ContextMenu.Trigger>
			<button
				type="button"
				class="focus:bg-accent hover:bg-accent text-muted-foreground flex cursor-pointer items-center gap-2 px-2 text-start outline-none"
				onkeydown={(e) => {
					if (e.key === 'F2') {
						renameMode = 'edit';
					}
				}}
			>
				{#if document.name.endsWith('.css')}
					<Icons.CSS class="size-4" />
				{:else if document.name.endsWith('.svelte')}
					<Icons.Svelte class="size-4" />
				{:else if document.name.endsWith('.ts')}
					<Icons.TypeScript class="size-3" />
				{:else}
					<FileIcon class="size-4" />
				{/if}
				<Rename.Root
					this="span"
					bind:value={document.name}
					blurBehavior="exit"
					class="text-foreground outline-ring flex h-7 w-[200px] !rounded-xs text-start focus:!ring-0 focus:outline-1 data-[mode=view]:place-items-center"
					validate={validateName}
					bind:mode={renameMode}
					fallbackCursorPositionBehavior="all"
				/>
			</button>
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Item>Cut</ContextMenu.Item>
			<ContextMenu.Item>Copy</ContextMenu.Item>
			<ContextMenu.Separator />
			<Rename.Edit>
				{#snippet child({ edit })}
					<ContextMenu.Item onSelect={edit}>
						Rename...
						<ContextMenu.Shortcut>F2</ContextMenu.Shortcut>
					</ContextMenu.Item>
				{/snippet}
			</Rename.Edit>
			<ContextMenu.Item>Delete</ContextMenu.Item>
		</ContextMenu.Content>
	</ContextMenu.Root>
</Rename.Provider>
