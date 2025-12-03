<script lang="ts">
	import MinusIcon from '@lucide/svelte/icons/minus';
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
		direction: 'down',
		onpointerdown: box.with(() => onpointerdown),
		onpointerup: box.with(() => onpointerup),
		onclick: box.with(() => onclick),
		disabled: box.with(() => disabled)
	});
</script>

<Button
	{variant}
	{size}
	aria-label="Decrease"
	class={cn('rounded-full', className)}
	{...buttonState.props}
	{...rest}
>
	{#if children}
		{@render children?.()}
	{:else}
		<MinusIcon />
	{/if}
</Button>
