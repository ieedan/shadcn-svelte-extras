<script lang="ts">
	import PlusIcon from '@lucide/svelte/icons/plus';
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

	const buttonState = useRampInputButton({ direction: 'up' });
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
		<PlusIcon />
	{/if}
</Button>
