<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { ComponentProps } from 'svelte';
	import { useAddDropdownCopyInit } from './add.svelte.js';
	import { mergeProps } from 'bits-ui';
	import { cn } from '$lib/utils';

	let {
		class: className,
		...rest
	}: Omit<ComponentProps<typeof DropdownMenu.Item>, 'onSelect'> = $props();

	const dropdownCopyInitState = useAddDropdownCopyInit();

	const mergedProps = mergeProps(rest, dropdownCopyInitState.props);
</script>

<DropdownMenu.Item class={cn('flex flex-col place-items-start! gap-1', className)} {...mergedProps}>
	<span class="text-xs">
		{dropdownCopyInitState.root.initCommand}
	</span>
	<span class="text-start text-xs text-muted-foreground">Init registry</span>
</DropdownMenu.Item>
