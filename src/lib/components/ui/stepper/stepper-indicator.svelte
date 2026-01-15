<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
	class={cn(
		'bg-primary text-primary-foreground z-1 flex size-7 items-center justify-center rounded-full ring-3 transition-colors select-none',
		'group-data-[state=inactive]/stepper-trigger:text-muted-foreground group-data-[state=inactive]/stepper-trigger:bg-muted ring-background',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
