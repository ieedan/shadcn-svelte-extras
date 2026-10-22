<script lang="ts">
	import * as ButtonGroup from '$lib/components/ui/button-group';
	import * as ColorPicker from '$lib/components/ui/color-picker';

	let value = $state('#22c55e');
</script>

<div class="flex items-center gap-3">
	<ColorPicker.Root bind:value>
		<ColorPicker.Popover>
			<ColorPicker.Trigger />
			<ColorPicker.Content class="w-80">
				<ColorPicker.Area />
				<ColorPicker.HueSlider />
				<ColorPicker.AlphaSlider />
				<div class="flex gap-2">
					<ColorPicker.FormatSelect />
					<ButtonGroup.Root class="grid flex-1 grid-cols-4">
						<ColorPicker.ChannelInputs />
						<ColorPicker.AlphaInput />
					</ButtonGroup.Root>
				</div>
			</ColorPicker.Content>
		</ColorPicker.Popover>
	</ColorPicker.Root>
	<!-- fixed width so the trigger doesn't move as the value gets longer -->
	<span class="text-muted-foreground w-56 font-mono text-sm">{value}</span>
</div>
