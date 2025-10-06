<script lang="ts">
	import NumberPicker from '$lib/components/ui/number-picker/number-picker.svelte';

	let value = $state(10);
</script>

<div class="w-40">
	<NumberPicker bind:value={value} min={10} max={30} step={2} />
</div>


