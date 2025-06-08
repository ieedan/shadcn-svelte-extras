<script lang="ts" module>
	import type { ButtonProps } from './types';
	import { buttonVariants, type ButtonSize, type ButtonVariant } from '.';

	// re-export for compatibility with original component
	export { type ButtonProps, buttonVariants, type ButtonSize, type ButtonVariant };
</script>

<script lang="ts">
	import { cn } from '$lib/utils/utils.js';
	import { LoaderCircleIcon } from '@lucide/svelte';

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
		...rest
	}: ButtonProps = $props();
</script>

<!-- This approach to disabled links is inspired by bits-ui see: https://github.com/huntabyte/bits-ui/pull/1055 -->
<svelte:element
	this={href ? 'a' : 'button'}
	{...rest}
	data-slot="button"
	type={href ? undefined : type}
	href={href && !disabled ? href : undefined}
	disabled={href ? undefined : disabled || loading}
	aria-disabled={href ? disabled : undefined}
	role={href && disabled ? 'link' : undefined}
	tabindex={href && disabled ? -1 : 0}
	class={cn(buttonVariants({ variant, size }), className)}
	bind:this={ref}
	onclick={async (
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		e: any
	) => {
		onclick?.(e);

		if (type === undefined) return;

		if (onClickPromise) {
			loading = true;

			await onClickPromise(e);

			loading = false;
		}
	}}
>
	{#if type !== undefined && loading}
		<div class="absolute flex size-full place-items-center justify-center bg-inherit">
			<div class="flex animate-spin place-items-center justify-center">
				<LoaderCircleIcon class="size-4" />
			</div>
		</div>
		<span class="sr-only">Loading</span>
	{/if}
	{@render children?.()}
</svelte:element>
