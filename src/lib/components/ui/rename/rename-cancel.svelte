<script lang="ts">
	import type { Snippet } from 'svelte';
	import Button, { type ButtonProps } from '$lib/components/button.svelte';
	import { useRenameCancel } from './rename.svelte.js';

	const cancelState = useRenameCancel();

	type Props = Omit<ButtonProps, 'type' | 'onclick'> & {
		child?: Snippet<[{ cancel: () => void }]>;
	};

	let { ref = $bindable(null), children, variant = 'outline', child, ...rest }: Props = $props();
</script>

{#if child}
	{@render child({ cancel: cancelState.cancel })}
{:else}
	<Button bind:ref type="button" onclick={cancelState.cancel} {variant} {...rest}>
		{#if children}
			{@render children()}
		{:else}
			Cancel
		{/if}
	</Button>
{/if}
