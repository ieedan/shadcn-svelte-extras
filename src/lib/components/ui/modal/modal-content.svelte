<script lang="ts">
	import { useModalSub } from './modal.svelte.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import type { DialogContentProps } from 'bits-ui';

	const modal = useModalSub();

	let {
		ref = $bindable(null),
		hideClose = false,
		children,
		...rest
	}: DialogContentProps & { hideClose?: boolean } = $props();
</script>

{#if modal.view === 'desktop'}
	<Dialog.Content bind:ref {...rest} {hideClose}>
		{@render children?.()}
	</Dialog.Content>
{:else}
	<Drawer.Content bind:ref {...rest}>
		{@render children?.()}
	</Drawer.Content>
{/if}
