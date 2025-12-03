<script lang="ts">
	import PlusIcon from '@lucide/svelte/icons/plus';
	import { Button } from '../button';
	import { useRampInputButton } from './ramp-input.svelte.js';
	import type { RampButtonProps } from './types.js';
	import { cn } from '$lib/utils';
	import { box } from 'svelte-toolbelt';

	let {
		variant = 'outline',
		size = 'icon',
		class: className,
		children,
		disabled = false,
		onpointerdown,
		onpointerup,
		onclick,
		...rest
	}: RampButtonProps = $props();

	const buttonState = useRampInputButton({
		direction: 'up',
		onpointerdown: box.with(() => onpointerdown),
		onpointerup: box.with(() => onpointerup),
		onclick: box.with(() => onclick),
		disabled: box.with(() => disabled)
	});
</script>

<Button
	{variant}
	{size}
	class={cn('rounded-full', className)}
	{...buttonState.props}
	{...rest}
>
	{#if children}
		{@render children?.()}
	{:else}
		<PlusIcon />
	{/if}
</Button>
