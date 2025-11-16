<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { useAddDropdownRegistryOption } from '$lib/components/ui/add/add.svelte.js';
	import { box } from 'svelte-toolbelt';
	import type { ComponentProps, Component } from 'svelte';
	import { cn } from '$lib/utils';
	import CheckIcon from '@lucide/svelte/icons/check';
	import AddRegistryLogo from './add-registry-logo.svelte';

	let {
		registry,
		class: className,
		fallbackIcon,
		...rest
	}: Omit<ComponentProps<typeof DropdownMenu.Item>, 'onSelect'> & {
		registry: string;
		fallbackIcon?: Component<{ class?: string; width?: number; height?: number }>;
	} = $props();

	const dropdownRegistryOptionState = useAddDropdownRegistryOption({
		registry: box.with(() => registry)
	});
</script>

<DropdownMenu.Item
	class={cn('flex items-center justify-between [&_svg]:size-3.5', className)}
	{...rest}
	{...dropdownRegistryOptionState.props}
>
	<span class="flex items-center gap-2">
		<AddRegistryLogo registry={dropdownRegistryOptionState.opts.registry.current} {fallbackIcon} />
		{registry}
	</span>
	<div class="size-4">
		{#if dropdownRegistryOptionState.root.registry === registry}
			<CheckIcon class="size-4" />
		{/if}
	</div>
</DropdownMenu.Item>
