<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { useAddDropdownAgentOption, type Agent } from '$lib/components/ui/add/add.svelte.js';
	import { box } from 'svelte-toolbelt';
	import type { ComponentProps } from 'svelte';
	import { cn } from '$lib/utils';
	import AddAgentLogo from './add-agent-logo.svelte';
	import CheckIcon from '@lucide/svelte/icons/check';

	let {
		agent,
		class: className,
		...rest
	}: Omit<ComponentProps<typeof DropdownMenu.Item>, 'onSelect'> & { agent: Agent } = $props();

	const dropdownAgentOptionState = useAddDropdownAgentOption({ agent: box.with(() => agent) });
</script>

<DropdownMenu.Item
	class={cn('flex items-center justify-between [&_svg]:size-3.5', className)}
	{...rest}
	{...dropdownAgentOptionState.props}
>
	<span class="flex items-center gap-2">
		<AddAgentLogo agent={dropdownAgentOptionState.opts.agent.current} />
		{agent}
	</span>
	<div class="size-4">
		{#if dropdownAgentOptionState.root.agent === agent}
			<CheckIcon class="size-4" />
		{/if}
	</div>
</DropdownMenu.Item>
