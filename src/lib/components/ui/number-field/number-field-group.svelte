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
		'*:data-[slot=number-field-increment]:rounded-end *:data-[slot=number-field-increment]:rounded-none *:data-[slot=number-field-increment]:focus-visible:ring-0',
		'*:data-[slot=number-field-decrement]:rounded-start *:data-[slot=number-field-decrement]:rounded-none *:data-[slot=number-field-decrement]:focus-visible:ring-0',
		'*:data-[slot=number-field-input]:rounded-none *:data-[slot=number-field-input]:border-x *:data-[slot=number-field-input]:border-y-0 *:data-[slot=number-field-input]:first:border-s-0 *:data-[slot=number-field-input]:last:border-e-0',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
