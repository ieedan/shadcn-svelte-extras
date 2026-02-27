<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	class={cn(
		'border-border bg-background flex h-9 items-center rounded-md border',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
