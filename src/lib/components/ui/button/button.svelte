<script lang="ts">
	import { cn } from '$lib/utils/utils.js';
	import { LoaderCircleIcon } from '@lucide/svelte';
	import type { ButtonProps } from './types';
	import { buttonVariants } from '.';

	let {
		ref = $bindable(null),
		variant = 'default',
		size = 'default',
		href = undefined,
		type = 'button',
		loading = false,
		disabled = false,
		onclick,
		onClickPromise,
		class: className,
		children,
		...restProps
	}: ButtonProps = $props();
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{href}
		{onclick}
		{...restProps}
	>
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		class={cn(buttonVariants({ variant, size }), className)}
		disabled={disabled || loading}
		{type}
		onclick={async (e) => {
			onclick?.(e);

			if (onClickPromise) {
				loading = true;

				await onClickPromise(e);

				loading = false;
			}
		}}
		{...restProps}
	>
		{#if loading}
			<div class="absolute flex size-full place-items-center justify-center bg-inherit">
				<div class="flex animate-spin place-items-center justify-center">
					<LoaderCircleIcon class="size-4" />
				</div>
			</div>
			<span class="sr-only">Loading</span>
		{/if}
		{@render children?.()}
	</button>
{/if}
