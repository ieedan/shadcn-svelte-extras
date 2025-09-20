<script lang="ts">
	import NumberPickerDrawer from '$lib/components/ui/number-picker/number-picker-drawer.svelte';

	let value = $state(12);
</script>

<div class="flex items-center gap-4">
	<NumberPickerDrawer bind:value={value} min={0} max={60} step={3} />
	<span class="text-sm text-muted-foreground">Selected: {value}</span>
</div>


