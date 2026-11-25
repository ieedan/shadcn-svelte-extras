<script lang="ts">
	import { useStepperRoot } from './stepper.svelte.ts';
	import type { StepperRootProps } from './types.ts';
	import { box } from 'svelte-toolbelt';

	let { step = $bindable(1), children }: StepperRootProps = $props();

	useStepperRoot({
		step: box.with(
			() => step,
			(v) => (step = v)
		)
	});
</script>

{@render children?.()}
