<script lang="ts">
	import { useModalSub } from './modal.svelte.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import type { DialogTriggerProps } from 'bits-ui';

	const modal = useModalSub();

	let { ref = $bindable(null), children, ...rest }: DialogTriggerProps = $props();
</script>

{#if modal.view === 'desktop'}
	<Dialog.Trigger bind:ref {...rest}>
		{@render children?.()}
	</Dialog.Trigger>
{:else}
	<Drawer.Trigger bind:ref {...rest}>
		{@render children?.()}
	</Drawer.Trigger>
{/if}
