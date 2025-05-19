<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import type { WithChildren } from 'bits-ui';

	type Props = WithChildren<{
		class?: string;
		orientation?: 'vertical' | 'horizontal';
	}>;

	let { orientation = 'horizontal', class: className, children }: Props = $props();
</script>

<div
	data-orientation={orientation}
	class={cn(
		'group/avatar-group flex items-center data-[orientation="horizontal"]:flex-row data-[orientation="horizontal"]:-space-x-2 data-[orientation="vertical"]:flex-col data-[orientation="vertical"]:-space-y-2',
		className
	)}
>
	{@render children?.()}
</div>
