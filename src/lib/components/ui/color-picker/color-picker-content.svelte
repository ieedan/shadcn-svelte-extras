<script lang="ts" module>
	import type { ComponentProps } from 'svelte';
	import type PopoverContent from '$lib/components/ui/popover/popover-content.svelte';

	export type ColorPickerContentProps = ComponentProps<typeof PopoverContent>;
</script>

<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		align = 'start',
		class: className,
		...rest
	}: ColorPickerContentProps = $props();
</script>

<Popover.Content
	bind:ref
	{align}
	data-slot="color-picker-content"
	class={cn('w-64 gap-3 p-3', className)}
	{...rest}
/>
