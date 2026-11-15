<script lang="ts">
	import * as ColorPicker from '$lib/components/ui/color-picker';

	let hex = $state('#8b5cf6');
	let rgb = $state('rgb(139 92 246)');
	let hsl = $state('hsl(258 90% 66%)');
	let hsb = $state('hsb(258 63% 96%)');
</script>

<div class="flex flex-wrap justify-center gap-6">
	<div class="flex flex-col items-center gap-2">
		<ColorPicker.Root bind:value={hex} format="hex" class="w-48">
			<ColorPicker.Area class="h-28" />
			<ColorPicker.HueSlider />
			<ColorPicker.Input />
		</ColorPicker.Root>
		<span class="text-muted-foreground font-mono text-xs">{hex}</span>
	</div>
	<div class="flex flex-col items-center gap-2">
		<ColorPicker.Root bind:value={rgb} format="rgb" class="w-48">
			<ColorPicker.Area class="h-28" />
			<ColorPicker.HueSlider />
			<ColorPicker.Input />
		</ColorPicker.Root>
		<span class="text-muted-foreground font-mono text-xs">{rgb}</span>
	</div>
	<div class="flex flex-col items-center gap-2">
		<ColorPicker.Root bind:value={hsl} format="hsl" class="w-48">
			<ColorPicker.Area class="h-28" />
			<ColorPicker.HueSlider />
			<ColorPicker.Input />
		</ColorPicker.Root>
		<span class="text-muted-foreground font-mono text-xs">{hsl}</span>
	</div>
	<div class="flex flex-col items-center gap-2">
		<ColorPicker.Root bind:value={hsb} format="hsb" class="w-48">
			<ColorPicker.Area class="h-28" />
			<ColorPicker.HueSlider />
			<ColorPicker.Input />
		</ColorPicker.Root>
		<span class="text-muted-foreground font-mono text-xs">{hsb}</span>
	</div>
</div>
