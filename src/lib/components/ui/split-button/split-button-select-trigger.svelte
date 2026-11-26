<script lang="ts" module>
	import type { WithoutChild } from '#lib/utils.ts';
	import type { ButtonSize, ButtonVariant } from '#lib/components/ui/button/index.ts';

	export type SplitButtonSelectTriggerProps = WithoutChild<SelectPrimitive.TriggerProps> & {
		variant?: ButtonVariant;
		size?: ButtonSize;
	};
</script>

<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn } from '#lib/utils.ts';
	import { buttonVariants } from '#lib/components/ui/button/index.ts';
	import { useSplitButtonRootCtx } from './split-button.svelte.ts';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'default',
		size = 'icon',
		disabled,
		children,
		...restProps
	}: SplitButtonSelectTriggerProps = $props();

	const root = useSplitButtonRootCtx();
</script>

<SelectPrimitive.Trigger
	bind:ref
	data-slot="split-button-select-trigger"
	disabled={disabled || root.disabled}
	class={cn(buttonVariants({ variant, size }), className)}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<ChevronDownIcon />
	{/if}
</SelectPrimitive.Trigger>
