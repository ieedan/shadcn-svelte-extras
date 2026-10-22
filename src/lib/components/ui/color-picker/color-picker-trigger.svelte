<script lang="ts" module>
	import type { Popover as PopoverPrimitive } from 'bits-ui';

	export type ColorPickerTriggerProps = Omit<PopoverPrimitive.TriggerProps, 'disabled'>;
</script>

<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils.js';
	import { useColorPickerRootCtx } from './color-picker.svelte.js';
	import { CHECKERBOARD } from './color.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...rest
	}: ColorPickerTriggerProps = $props();

	const root = useColorPickerRootCtx();
</script>

<Popover.Trigger
	bind:ref
	data-slot="color-picker-trigger"
	aria-label="Pick a color"
	disabled={root.disabled}
	class={cn(
		'border-input focus-visible:border-ring focus-visible:ring-ring/50 size-9 shrink-0 rounded-md border p-1 shadow-xs outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed',
		className
	)}
	{...rest}
>
	{#if children}
		{@render children()}
	{:else}
		<span
			data-slot="color-picker-trigger-swatch"
			class="block size-full rounded-sm ring-1 ring-black/10 ring-inset"
			style="background: linear-gradient({root.rgb}, {root.rgb}), {CHECKERBOARD}"
		></span>
	{/if}
</Popover.Trigger>
