<script lang="ts">
	import NumberPicker from '$lib/components/ui/number-picker/number-picker.svelte';

	let value = $state(0);
</script>

<div class="w-40">
	<NumberPicker bind:value={value} min={0} max={100} step={5} />
</div>


