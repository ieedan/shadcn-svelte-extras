<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { FolderIcon, FolderOpenIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils/utils';

	type Props = {
		name: string;
		open?: boolean;
		class?: string;
		icon?: Snippet<[{ name: string; open: boolean }]>;
		children?: Snippet<[]>;
	};

	let { name, open = $bindable(true), class: className, icon, children }: Props = $props();
</script>

<Collapsible.Root bind:open>
	<Collapsible.Trigger class={cn('flex place-items-center gap-1', className)}>
		{#if icon}
			{@render icon({ name, open })}
		{:else if open}
			<FolderOpenIcon class="size-4" />
		{:else}
			<FolderIcon class="size-4" />
		{/if}
		<span>{name}</span>
	</Collapsible.Trigger>
	<Collapsible.Content class="mx-2 border-l">
		<div class="relative flex place-items-start">
			<div class="bg-border mx-2 h-full w-px"></div>
			<div class="flex flex-col">
				{@render children?.()}
			</div>
		</div>
	</Collapsible.Content>
</Collapsible.Root>
