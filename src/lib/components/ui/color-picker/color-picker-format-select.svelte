<script lang="ts" module>
	import type { ComponentProps } from 'svelte';
	import type { ColorFormat } from './color.js';
	import type { SelectTrigger } from '$lib/components/ui/select';

	export type ColorPickerFormatSelectProps = Omit<
		ComponentProps<typeof SelectTrigger>,
		'children' | 'size'
	> & {
		/** The formats to offer, in order. */
		formats?: ColorFormat[];
	};
</script>

<script lang="ts">
	import * as SelectPrimitive from '$lib/components/ui/select';
	import { cn } from '$lib/utils.js';
	import { useColorPickerRootCtx } from './color-picker.svelte.js';

	let {
		ref = $bindable(null),
		class: className,
		formats = ['hex', 'rgb', 'hsl', 'hsb'],
		...rest
	}: ColorPickerFormatSelectProps = $props();

	const root = useColorPickerRootCtx();

	const LABELS: Record<ColorFormat, string> = { hex: 'HEX', rgb: 'RGB', hsl: 'HSL', hsb: 'HSB' };
</script>

<SelectPrimitive.Root
	type="single"
	value={root.format}
	onValueChange={(v) => (root.format = v as ColorFormat)}
	disabled={root.disabled}
>
	<SelectPrimitive.Trigger
		bind:ref
		size="sm"
		data-slot="color-picker-format-select"
		aria-label="Color format"
		class={cn('text-xs', className)}
		{...rest}
	>
		{LABELS[root.format]}
	</SelectPrimitive.Trigger>
	<SelectPrimitive.Content class="min-w-0">
		{#each formats as format (format)}
			<SelectPrimitive.Item value={format} label={LABELS[format]} class="text-xs" />
		{/each}
	</SelectPrimitive.Content>
</SelectPrimitive.Root>
