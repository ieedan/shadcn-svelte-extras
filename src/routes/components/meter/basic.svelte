<script lang="ts">
	import { Meter } from '$lib/components/ui/meter';
	import { cn } from '$lib/utils/utils.js';
	import { onMount } from 'svelte';
	import { linear } from 'svelte/easing';
	import { Tween } from 'svelte/motion';

	const LIMIT = 100;

	const usage = new Tween(0, {
		duration: 2500,
		easing: linear
	});

	onMount(() => {
		setTimeout(() => {
			usage.set(100);
		}, 500);
	});
</script>

<div class="w-[200px]">
	<div class="flex place-items-center justify-between text-sm">
		<span>Tokens</span>
		<span>{usage.current.toFixed(0)}/{LIMIT}</span>
	</div>
	<Meter
		class={cn('--meter-background:(var(--color-blue-500))', {
			'![--meter-background:var(--destructive)]': usage.current === LIMIT,
			'[--meter-background:var(--color-orange-400)]': usage.current > LIMIT * 0.75
		})}
		value={usage.current}
		max={LIMIT}
	/>
</div>
