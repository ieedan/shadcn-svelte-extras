<script lang="ts">
	import type { WithElementRef, WithoutChildren } from 'bits-ui';
	import type { HTMLTextareaAttributes } from 'svelte/elements';
	import { cn } from '$lib/utils/utils.js';
	import { nanoid } from '$lib/utils/nanoid';
	import type { WithTextAreaAutoSize } from '.';

	let {
		ref = $bindable(null),
		value = $bindable(),
		autosize = false,
		class: className,
		...restProps
	}: WithoutChildren<WithElementRef<WithTextAreaAutoSize<HTMLTextareaAttributes>>> = $props();

	let height: number = $state(0);
	const mirrorId = nanoid();
	const scrollTolerance = 15;

	if (autosize) {
		$effect(() => {
			//IMPORTANT: Do nor remove, or reactivity will not trigger
			value;

			const clientHeight = document?.getElementById(mirrorId)?.clientHeight ?? 0;
			height = clientHeight + scrollTolerance;
		});
	}
</script>

{#if autosize}
	<div class="relative w-full">
		<textarea
			bind:this={ref}
			class={cn(
				'overflow-hidden',
				'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
				className
			)}
			style={`height: ${height}px`}
			bind:value
			{...restProps}
		></textarea>
		<div id={mirrorId} class={cn('invisible absolute left-0 top-0 whitespace-pre-wrap', className)}>
			{value}&nbsp;
		</div>
	</div>
{:else}
	<textarea
		bind:this={ref}
		class={cn(
			'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
			className
		)}
		bind:value
		{...restProps}
	></textarea>
{/if}
