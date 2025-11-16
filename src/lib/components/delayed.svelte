<script lang="ts">
	import { onMount, type Snippet } from 'svelte';

	type Props = {
		delay: number;
		children: Snippet;
	};

	let { delay, children }: Props = $props();

	let visible = $state(false);

	onMount(() => {
		const timeout = setTimeout(() => {
			visible = true;
		}, delay);

        return () => clearTimeout(timeout);
	});
</script>

{#if visible}
	{@render children?.()}
{/if}
