<script lang="ts">
	import FileIcon from '@lucide/svelte/icons/file';
	import { cn } from '$lib/utils.js';
	import type { TreeViewFileProps } from './types';

	let { name, icon, selected, type = 'button', class: className, ...rest }: TreeViewFileProps = $props();
</script>

<button {type} role="treeitem" aria-selected={selected} class={cn('flex place-items-center gap-1 pl-[3px]', className)} {...rest}>
	{#if icon}
		{@render icon({ name })}
	{:else}
		<FileIcon class="size-4" />
	{/if}
	<span>{name}</span>
</button>
