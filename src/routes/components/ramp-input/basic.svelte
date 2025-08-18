<script lang="ts">
	import * as RampInput from '$lib/components/ui/ramp-input';

	let value = $state(50);
</script>

<RampInput.Root bind:value rampBy={1} min={0} max={100}>
	<RampInput.RampUp />
	<RampInput.Input />
	<RampInput.RampDown />
</RampInput.Root>
