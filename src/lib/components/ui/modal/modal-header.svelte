<script lang="ts">
	import { useModalSub } from './modal.svelte.ts';
	import * as Dialog from '#lib/components/ui/dialog/index.ts';
	import * as Drawer from '#lib/components/ui/drawer/index.ts';
	import type { WithElementRef } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	const modal = useModalSub();

	let {
		ref = $bindable(null),
		children,
		...rest
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

{#if modal.view === 'desktop'}
	<Dialog.Header bind:ref {...rest}>
		{@render children?.()}
	</Dialog.Header>
{:else}
	<Drawer.Header bind:ref {...rest}>
		{@render children?.()}
	</Drawer.Header>
{/if}
