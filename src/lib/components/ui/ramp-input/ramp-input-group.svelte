<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...rest
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	class={cn(
		'border-border flex h-9 items-center overflow-hidden rounded-md border',
		'*:data-[slot=ramp-input-increment]:rounded-end *:data-[slot=ramp-input-increment]:rounded-none *:data-[slot=ramp-input-increment]:focus-visible:ring-0',
		'*:data-[slot=ramp-input-decrement]:rounded-start *:data-[slot=ramp-input-decrement]:rounded-none *:data-[slot=ramp-input-decrement]:focus-visible:ring-0',
		'*:data-[slot=ramp-input-input]:rounded-none *:data-[slot=ramp-input-input]:border-x *:data-[slot=ramp-input-input]:border-y-0 *:data-[slot=ramp-input-input]:first:border-s-0 *:data-[slot=ramp-input-input]:last:border-e-0',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
