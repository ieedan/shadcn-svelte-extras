<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Button, type ButtonElementProps } from '../button';
	import { useRenameEdit } from './rename.svelte.js';

	const editState = useRenameEdit();

	type Props = Omit<ButtonElementProps, 'type' | 'onclick'> & {
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	};

	let { ref = $bindable(null), children, variant = 'outline', child, ...rest }: Props = $props();
</script>

{#if child}
	{@render child({ props: { ref, variant, ...rest } })}
{:else}
	<Button bind:ref type="button" onclick={editState.edit} {variant} {...rest}>
		{#if children}
			{@render children()}
		{:else}
			Edit
		{/if}
	</Button>
{/if}
