<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { useAddButton } from './add.svelte.js';
	import { cn } from '$lib/utils';
	import CheckIcon from '@lucide/svelte/icons/check';
	import AddAgentLogo from './add-agent-logo.svelte';

	let { class: className, ...rest }: Omit<HTMLButtonAttributes, 'onclick'> = $props();

	const buttonState = useAddButton();
</script>

<button
	type="button"
	class={cn(
		'flex flex-1 place-items-center rounded-l-md transition-colors hover:bg-accent md:pr-2 [&_svg]:size-3.5',
		className
	)}
	{...rest}
	{...buttonState.props}
>
	<div class="flex size-9 items-center justify-center">
		<CheckIcon
			class={cn(
				'absolute scale-0 transition-all ease-out',
				buttonState.root.clipboard.copied && 'scale-100'
			)}
		/>
		<AddAgentLogo
			agent={buttonState.root.agent}
			class={cn(
				'absolute scale-100 transition-all ease-out',
				buttonState.root.clipboard.copied && 'scale-0'
			)}
		/>
	</div>
	<span class="hidden font-mono text-xs text-nowrap text-ellipsis select-text md:inline">
		{buttonState.root.addCommand}
	</span>
</button>
