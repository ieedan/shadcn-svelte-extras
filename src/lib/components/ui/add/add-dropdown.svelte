<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { cn } from '$lib/utils.js';
	import ChevronDown from '@lucide/svelte/icons/chevron-down';
	import type { ComponentProps } from 'svelte';

	let {
		children,
		class: className,
		...rest
	}: ComponentProps<typeof DropdownMenu.Trigger> = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={cn(
			'flex size-9 items-center justify-center rounded-r-md transition-colors hover:bg-accent [&_svg]:size-3.5',
			className
		)}
		{...rest}
	>
		<ChevronDown />
	</DropdownMenu.Trigger>
	{@render children?.()}
</DropdownMenu.Root>
