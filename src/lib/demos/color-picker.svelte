<script lang="ts">
	import * as ColorPicker from '$lib/components/ui/color-picker';

	let value = $state('#3b82f6');
</script>

<div class="flex flex-col items-center gap-4">
	<ColorPicker.Root bind:value>
		<ColorPicker.Area />
		<ColorPicker.HueSlider />
		<ColorPicker.AlphaSlider />
		<ColorPicker.Input />
	</ColorPicker.Root>
	<span class="text-muted-foreground text-sm">Color is {value}</span>
</div>
