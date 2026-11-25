<script lang="ts">
	import { useModalSub } from './modal.svelte.ts';
	import * as Dialog from '#lib/components/ui/dialog/index.ts';
	import * as Drawer from '#lib/components/ui/drawer/index.ts';
	import type { DialogDescriptionProps } from 'bits-ui';

	const modal = useModalSub();

	let { ref = $bindable(null), ...rest }: DialogDescriptionProps = $props();
</script>

{#if modal.view === 'desktop'}
	<Dialog.Description bind:ref {...rest} />
{:else}
	<Drawer.Description bind:ref {...rest} />
{/if}
