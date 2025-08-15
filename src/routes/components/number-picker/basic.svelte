<script lang="ts">
	import NumberPicker from '$lib/components/ui/number-picker/number-picker.svelte';

	let value = $state(5);
</script>

<div class="w-40">
	<NumberPicker bind:value={value} min={0} max={20} step={1} />
</div>


