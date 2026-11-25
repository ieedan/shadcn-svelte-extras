<script lang="ts">
	import { cn } from '#lib/utils.ts';
	import type { FieldSetTitleProps } from './types.ts';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: FieldSetTitleProps = $props();
</script>

<div bind:this={ref} class={cn('p-6', className)} {...restProps}>
	{@render children?.()}
</div>
