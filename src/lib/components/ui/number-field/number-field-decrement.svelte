<script lang="ts">
	import MinusIcon from '@lucide/svelte/icons/minus';
	import { Button } from '../button';
	import { useNumberFieldButton } from './number-field.svelte.js';
	import type { NumberFieldButtonProps } from './types.js';
	import { cn } from '$lib/utils';
	import { box } from 'svelte-toolbelt';
	import { onDestroy } from 'svelte';

	let {
		ref = $bindable(null),
		variant = 'ghost',
		size = 'icon',
		class: className,
		children,
		disabled = false,
		onpointerdown,
		onpointerup,
		onpointerleave,
		onpointercancel,
		onclick,
		tabindex = -1,
		...rest
	}: NumberFieldButtonProps = $props();

	const buttonState = useNumberFieldButton({
		direction: 'down',
		onpointerdown: box.with(() => onpointerdown),
		onpointerup: box.with(() => onpointerup),
		onpointerleave: box.with(() => onpointerleave),
		onpointercancel: box.with(() => onpointercancel),
		onclick: box.with(() => onclick),
		disabled: box.with(() => disabled)
	});

	onDestroy(() => buttonState.destroy());
</script>

<Button
	{variant}
	{size}
	{tabindex}
	bind:ref
	data-slot="number-field-decrement"
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
