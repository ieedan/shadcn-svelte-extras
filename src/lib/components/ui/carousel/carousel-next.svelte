<script lang="ts">
	import type { WithoutChildren } from 'bits-ui';
	import { getEmblaContext } from './context.ts';
	import { cn } from '#lib/utils.ts';
	import { Button, type Props } from '#lib/components/ui/button/index.ts';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'outline',
		size = 'icon-sm',
		...restProps
	}: WithoutChildren<Props> = $props();

	const emblaCtx = getEmblaContext('<Carousel.Next/>');
</script>

<Button
	data-slot="carousel-next"
	{variant}
	{size}
	aria-disabled={!emblaCtx.canScrollNext}
	disabled={!emblaCtx.canScrollNext}
	class={cn(
		'absolute touch-manipulation rounded-full',
		emblaCtx.orientation === 'horizontal'
			? '-end-12 top-1/2 -translate-y-1/2'
			: 'start-1/2 -bottom-12 -translate-x-1/2 rotate-90',
		className
	)}
	onclick={emblaCtx.scrollNext}
	onkeydown={emblaCtx.handleKeyDown}
	bind:ref
	{...restProps}
>
	<ChevronRightIcon />
	<span class="sr-only">Next slide</span>
</Button>
