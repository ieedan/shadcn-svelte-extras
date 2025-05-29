<script lang="ts">
	import { useModalSub } from './modal.svelte.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import type { DialogTitleProps } from 'bits-ui';

	const modal = useModalSub();

	let { ref = $bindable(null), ...rest }: DialogTitleProps = $props();
</script>

{#if modal.view === 'desktop'}
	<Dialog.Title bind:ref {...rest} />
{:else}
	<Drawer.Title bind:ref {...rest} />
{/if}
