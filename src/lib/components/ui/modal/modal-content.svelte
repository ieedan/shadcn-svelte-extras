<script lang="ts">
	import { useModalSub } from './modal.svelte.ts';
	import * as Dialog from '#lib/components/ui/dialog/index.ts';
	import * as Drawer from '#lib/components/ui/drawer/index.ts';
	import type { DialogContentProps } from 'bits-ui';

	const modal = useModalSub();

	let {
		ref = $bindable(null),
		showCloseButton = true,
		children,
		...rest
	}: DialogContentProps & { showCloseButton?: boolean } = $props();
</script>

{#if modal.view === 'desktop'}
	<Dialog.Content bind:ref {showCloseButton} {...rest}>
		{@render children?.()}
	</Dialog.Content>
{:else}
	<Drawer.Content bind:ref {...rest}>
		{@render children?.()}
	</Drawer.Content>
{/if}
