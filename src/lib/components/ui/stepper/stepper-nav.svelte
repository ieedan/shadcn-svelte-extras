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
		'flex',
		{
			'flex-row justify-between': orientation === 'horizontal',
			'flex-col gap-2': orientation === 'vertical'
		},
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
