<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Button, type ButtonElementProps } from '../button';
	import { useRenameCancel } from './rename.svelte.js';

	const cancelState = useRenameCancel();

	type Props = Omit<ButtonElementProps, 'type' | 'onclick'> & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	};

	let { ref = $bindable(null), children, variant = 'outline', child, ...rest }: Props = $props();
</script>

{#if child}
	{@render child({ props: { ref, variant, ...rest } })}
{:else}
	<Button bind:ref type="button" onclick={cancelState.cancel} {variant} {...rest}>
		{#if children}
			{@render children()}
		{:else}
			Cancel
		{/if}
	</Button>
{/if}
