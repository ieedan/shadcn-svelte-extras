<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { AvatarGroupRootProps } from './types';

	let {
		ref = $bindable(null),
		orientation = 'horizontal',
		class: className,
		children,
		...rest
	}: AvatarGroupRootProps = $props();
</script>

<div
	bind:this={ref}
	data-orientation={orientation}
	class={cn(
		'group/avatar-group flex items-center data-[orientation="horizontal"]:flex-row data-[orientation="horizontal"]:-space-x-2 data-[orientation="vertical"]:flex-col data-[orientation="vertical"]:-space-y-2',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
