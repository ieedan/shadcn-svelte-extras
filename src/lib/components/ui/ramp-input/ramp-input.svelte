<script lang="ts">
	import { box } from 'svelte-toolbelt';
	import type { RampInputRootProps } from './types';
	import { useRampInput } from './ramp-input.svelte.js';

	let {
		value = $bindable(0),
		rampBy = 1,
		min,
		max,
		rampSettings = { startDelay: 400, rampUpTime: 0, minFrequency: 35, maxFrequency: 35 },
		children
	}: RampInputRootProps = $props();

	useRampInput({
		value: box.with(
			() => value,
			(v) => (value = v)
		),
		rampBy: box.with(() => rampBy),
		min: box.with(() => min),
		max: box.with(() => max),
		rampSettings: box.with(() => rampSettings)
	});
</script>

{@render children?.()}
