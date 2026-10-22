<script lang="ts" module>
	import type { Popover as PopoverPrimitive } from 'bits-ui';

	export type ColorPickerPopoverProps = PopoverPrimitive.RootProps;
</script>

<script lang="ts">
	import * as Popover from '$lib/components/ui/popover';

	let { open = $bindable(false), ...rest }: ColorPickerPopoverProps = $props();
</script>

<Popover.Root bind:open {...rest} />
