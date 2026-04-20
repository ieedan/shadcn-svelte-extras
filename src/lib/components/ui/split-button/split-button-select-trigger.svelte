<script lang="ts" module>
	import type { WithoutChild } from '$lib/utils.js';
	import type { ButtonSize, ButtonVariant } from '$lib/components/ui/button';

	export type SplitButtonSelectTriggerProps = WithoutChild<SelectPrimitive.TriggerProps> & {
		variant?: ButtonVariant;
		size?: ButtonSize;
	};
</script>

<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { buttonVariants } from '$lib/components/ui/button';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'default',
		size = 'icon',
		children,
		...restProps
	}: SplitButtonSelectTriggerProps = $props();
</script>

<SelectPrimitive.Trigger
	bind:ref
	data-slot="split-button-select-trigger"
	class={cn(buttonVariants({ variant, size }), className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<ChevronDownIcon />
	{/if}
</SelectPrimitive.Trigger>
