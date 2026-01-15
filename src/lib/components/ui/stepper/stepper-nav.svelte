<script lang="ts">
	import { cn } from '$lib/utils';
	import type { StepperNavProps } from './types';

	let {
		orientation = 'horizontal',
		class: className,
		children,
		...rest
	}: StepperNavProps = $props();
</script>

<div
	class={cn(
		'flex gap-2 justify-between',
		{
			'flex-row': orientation === 'horizontal',
			'flex-col': orientation === 'vertical'
		},
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
