<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { Snippet } from 'svelte';

	type Props = {
		previous?: Snippet<[]>;
		next?: Snippet<[]>;
		class?: string;
	};

	let { next, previous, class: className = undefined }: Props = $props();
</script>

<div class={cn('flex place-items-center justify-between', className)}>
	<div>
		{@render previous?.()}
	</div>
	<div>
		{@render next?.()}
	</div>
</div>
