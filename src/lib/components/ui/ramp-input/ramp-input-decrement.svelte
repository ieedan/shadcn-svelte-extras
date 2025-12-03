<script lang="ts">
	import MinusIcon from '@lucide/svelte/icons/minus';
	import { Button } from '../button';
	import { useRampInputButton } from './ramp-input.svelte.js';
	import type { RampButtonProps } from './types.js';
	import { cn } from '$lib/utils';
	import { box } from 'svelte-toolbelt';

	let {
		ref = $bindable(null),
		variant = 'ghost',
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
	bind:ref
	data-slot="ramp-input-decrement"
	aria-label="Decrease"
	class={cn(className)}
	{...buttonState.props}
	{...rest}
>
	{#if children}
		{@render children?.()}
	{:else}
		<MinusIcon />
	{/if}
</Button>
