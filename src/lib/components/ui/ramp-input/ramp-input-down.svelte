<script lang="ts">
	import MinusIcon from '@lucide/svelte/icons/minus';
	import { Button } from '../button';
	import { useRampInputButton } from './ramp-input.svelte.js';
	import type { RampButtonProps } from './types.js';
	import { cn } from '$lib/utils/utils';

	let {
		variant = 'outline',
		size = 'icon',
		class: className,
		children,
		...rest
	}: RampButtonProps = $props();

	const buttonState = useRampInputButton({ direction: 'down' });
</script>

<Button
	{variant}
	{size}
	class={cn('rounded-full', className)}
	disabled={!buttonState.enabled}
	onpointerdown={buttonState.ramp}
	{...rest}
>
	{#if children}
		{@render children?.()}
	{:else}
		<MinusIcon />
	{/if}
</Button>
