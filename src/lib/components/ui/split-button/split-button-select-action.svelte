<script lang="ts" module>
	import type { Select as SelectPrimitiveNs } from 'bits-ui';
	import type { WithoutChild } from '$lib/utils.js';

	export type SplitButtonSelectActionProps = WithoutChild<SelectPrimitiveNs.ItemProps>;
</script>

<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';
	import { useSplitButtonSelectAction } from './split-button.svelte.js';
	import { box } from 'svelte-toolbelt';
	import CheckIcon from '@lucide/svelte/icons/check';

	let {
		ref = $bindable(null),
		class: className,
		value,
		label,
		children: childrenProp,
		...restProps
	}: SplitButtonSelectActionProps = $props();

	useSplitButtonSelectAction({
		value: box.with(() => value)
	});
</script>

<SelectPrimitive.Item
	bind:ref
	{value}
	data-slot="split-button-select-action"
	class={cn(
		"focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex w-full cursor-default items-start gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
		className
	)}
	{...restProps}
>
	{#snippet children({ selected, highlighted })}
		<span class="absolute end-2 top-2 flex size-3.5 items-center justify-center">
			{#if selected}
				<CheckIcon />
			{/if}
		</span>
		{#if childrenProp}
			{@render childrenProp({ selected, highlighted })}
		{:else}
			{label || value}
		{/if}
	{/snippet}
</SelectPrimitive.Item>
