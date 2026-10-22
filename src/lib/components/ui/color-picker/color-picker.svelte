<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WithChildren, WithoutChildren } from 'bits-ui';
	import type { WithElementRef } from '$lib/utils.js';
	import type { ColorFormat } from './color.js';

	export type ColorPickerPropsWithoutHTML = WithChildren<{
		ref?: HTMLDivElement | null;
		value?: string;
		format?: ColorFormat;
		disabled?: boolean;
	}>;

	export type ColorPickerProps = ColorPickerPropsWithoutHTML &
		WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>>;
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { box } from 'svelte-toolbelt';
	import { useColorPickerRoot } from './color-picker.svelte.js';

	let {
		ref = $bindable(null),
		value = $bindable('#000000'),
		format = $bindable('hex'),
		disabled = false,
		class: className,
		children,
		...rest
	}: ColorPickerProps = $props();

	useColorPickerRoot({
		value: box.with(
			() => value,
			(v) => (value = v)
		),
		format: box.with(
			() => format,
			(v) => (format = v)
		),
		disabled: box.with(() => disabled)
	});
</script>

<div
	bind:this={ref}
	data-slot="color-picker"
	data-disabled={disabled ? '' : undefined}
	class={cn(
		'flex w-64 flex-col gap-3 has-data-[slot=color-picker-trigger]:w-fit data-disabled:opacity-50',
		className
	)}
	{...rest}
>
	{@render children?.()}
</div>
