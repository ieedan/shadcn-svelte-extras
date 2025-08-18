<script lang="ts">
	import { box } from 'svelte-toolbelt';
	import type { RampInputRootProps } from './types';
	import { useRampInput } from './ramp-input.svelte.js';

	let { value = $bindable(0), rampBy = 1, min, max, children }: RampInputRootProps = $props();

	useRampInput({
		value: box.with(
			() => value,
			(v) => (value = v)
		),
		rampBy: box.with(() => rampBy),
		min: box.with(() => min),
		max: box.with(() => max)
	});
</script>

{@render children?.()}
