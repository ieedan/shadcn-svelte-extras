<script lang="ts">
	import * as RampInput from '$lib/components/ui/ramp-input';

	let value = $state(50);
</script>

<RampInput.Root bind:value rampBy={1} min={0} max={100}>
	<div class="border-border flex h-9 items-center overflow-hidden rounded-md border">
		<RampInput.RampDown
			class="rounded-start rounded-none focus-visible:ring-0"
			variant="ghost"
			tabindex={-1}
		/>
		<RampInput.Input class="rounded-none border-x border-y-0" />
		<RampInput.RampUp
			class="rounded-end rounded-none focus-visible:ring-0"
			variant="ghost"
			tabindex={-1}
		/>
	</div>
</RampInput.Root>
