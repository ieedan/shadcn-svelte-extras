<script lang="ts">
	import * as RampInput from '$lib/components/ui/ramp-input';
</script>

<RampInput.Root min={-1000} max={1000}>
	<RampInput.Group>
		<RampInput.Decrement />
		<RampInput.Input />
		<RampInput.Increment />
	</RampInput.Group>
</RampInput.Root>
