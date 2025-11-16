<script lang="ts">
	import type { Snippet } from 'svelte';
	import { useAdd } from './add.svelte.js';
	import { box } from 'svelte-toolbelt';

	type Props = {
		item: string;
		children: Snippet;
		withoutRegistry?: boolean;
	};

	let { item, children, withoutRegistry = false }: Props = $props();

	useAdd({
		item: box.with(() => item),
		withoutRegistry: box.with(() => withoutRegistry)
	});
</script>

{@render children?.()}
