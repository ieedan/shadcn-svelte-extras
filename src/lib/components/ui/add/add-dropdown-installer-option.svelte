<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import {
		useAddDropdownInstallerOption,
		type Installer
	} from '$lib/components/ui/add/add.svelte.js';
	import { box } from 'svelte-toolbelt';
	import type { ComponentProps } from 'svelte';
	import { cn } from '$lib/utils';
	import CheckIcon from '@lucide/svelte/icons/check';
	import { Badge } from '$lib/components/ui/badge';
	import AddInstallerLogo from './add-installer-logo.svelte';

	let {
		installer,
		class: className,
		...rest
	}: Omit<ComponentProps<typeof DropdownMenu.Item>, 'onSelect'> & {
		installer: Installer;
	} = $props();

	const state = useAddDropdownInstallerOption({ installer: box.with(() => installer) });
</script>

<DropdownMenu.Item
	class={cn('flex items-center justify-between [&_svg]:size-3.5', className)}
	{...rest}
	{...state.props}
>
	<span class="flex items-center gap-2">
		<AddInstallerLogo {installer} />
		{installer === 'shadcn-svelte' ? 'shadcn-svelte' : 'jsrepo'}
		{#if installer === 'jsrepo'}
			<Badge variant="secondary" class="h-5 px-1.5 text-[10px] font-medium">Recommended</Badge>
		{/if}
	</span>
	<div class="size-4">
		{#if state.root.installer === installer}
			<CheckIcon class="size-4" />
		{/if}
	</div>
</DropdownMenu.Item>
