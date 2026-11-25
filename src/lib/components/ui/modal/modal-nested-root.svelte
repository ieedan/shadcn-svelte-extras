<script lang="ts">
	import * as Dialog from '#lib/components/ui/dialog/index.ts';
	import * as Drawer from '#lib/components/ui/drawer/index.ts';
	import type { DialogRootProps } from 'bits-ui';
	import { useModal } from '#lib/components/ui/modal/modal.svelte.ts';

	let { open = $bindable(false), children, ...rest }: DialogRootProps = $props();

	const modal = useModal();
</script>

{#if modal.view === 'desktop'}
	<Dialog.Root bind:open {...rest}>
		{@render children?.()}
	</Dialog.Root>
{:else}
	<Drawer.NestedRoot bind:open {...rest}>
		{@render children?.()}
	</Drawer.NestedRoot>
{/if}
