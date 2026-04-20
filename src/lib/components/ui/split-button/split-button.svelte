<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WithChildren, WithoutChildren } from 'bits-ui';

	export type SplitButtonPropsWithoutHTML = WithChildren<{
		ref?: HTMLDivElement | null;
	}>;

	export type SplitButtonProps = SplitButtonPropsWithoutHTML &
		WithoutChildren<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...rest
	}: SplitButtonProps = $props();
</script>

<div
	bind:this={ref}
	data-slot="split-button"
	class={cn(className)}
	role="group"
	{...rest}
>
	{@render children?.()}
</div>
