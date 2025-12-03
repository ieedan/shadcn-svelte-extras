<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		class?: string;
	}

	let { class: className = undefined, children, ...rest }: Props = $props();
</script>

<span class={cn('bg-accent rounded-md px-1 py-1 font-mono text-sm', className)} {...rest}>
	{@render children?.()}
</span>
