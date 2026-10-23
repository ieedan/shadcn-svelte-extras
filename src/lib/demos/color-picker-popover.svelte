<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as ButtonGroup from '$lib/components/ui/button-group';
	import * as ColorPicker from '$lib/components/ui/color-picker';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils.js';

	let value = $state('#22c55e');

	// the color over a checkerboard, so transparency shows
	const swatch = $derived(
		`linear-gradient(${value}, ${value}), repeating-conic-gradient(#d4d4d4 0% 25%, #fff 0% 50%) 50% / 8px 8px`
	);
</script>

<ColorPicker.Root bind:value class="w-fit">
	<Popover.Root>
		<Popover.Trigger
			aria-label="Pick a color"
			class={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'p-1')}
		>
			<span class="size-full rounded-sm ring-1 ring-black/10 ring-inset" style:background={swatch}
			></span>
		</Popover.Trigger>
		<Popover.Content class="w-80 gap-3 p-3">
			<ColorPicker.Area />
			<ColorPicker.HueSlider />
			<ColorPicker.AlphaSlider />
			<div class="flex gap-2">
				<!-- hsb isn't a CSS color, so leave it out when `value` paints the trigger -->
				<ColorPicker.FormatSelect formats={['hex', 'rgb', 'hsl']} />
				<ButtonGroup.Root class="grid flex-1 grid-cols-4">
					<ColorPicker.ChannelInputs />
					<ColorPicker.AlphaInput />
				</ButtonGroup.Root>
			</div>
		</Popover.Content>
	</Popover.Root>
</ColorPicker.Root>
