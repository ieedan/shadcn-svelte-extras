<script lang="ts">
	import { cn } from '#lib/utils.ts';
	import { fieldSetVariants } from './index.ts';
	import type { FieldSetRootProps } from './types.ts';

	let {
		ref = $bindable(null),
		variant = 'default',
		children,
		class: className,
		...rest
	}: FieldSetRootProps = $props();
</script>

<div bind:this={ref} class={cn(fieldSetVariants({ variant }), className)} {...rest}>
	{@render children?.()}
</div>
