<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	data-slot="stepper-title"
	class={cn(
		'text-lg font-medium',
		'group-data-[orientation=vertical]/stepper-nav:text-left',
		'group-data-[orientation=horizontal]/stepper-nav:text-center',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
