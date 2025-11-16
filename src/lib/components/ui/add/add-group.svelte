<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	class={cn(
		'flex h-9 items-center overflow-hidden rounded-md border border-border bg-background',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
