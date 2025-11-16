<script lang="ts">
	import { useDemoRefresh } from './demo.svelte.js';
	import { cn } from '$lib/utils.js';
	import { controlVariants } from './index.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { WithElementRef } from 'bits-ui';
	import RotateCcwIcon from '@lucide/svelte/icons/rotate-ccw';

	let {
		ref = $bindable(null),
		class: className,
		...rest
	}: WithElementRef<Omit<HTMLButtonAttributes, 'aria-label' | 'onclick' | 'type'>> = $props();

	const refreshState = useDemoRefresh();
</script>

<button
	type="button"
	aria-label="Refresh"
	bind:this={ref}
	class={cn(controlVariants(), className)}
	onclick={refreshState.refresh}
	{...rest}
>
	<RotateCcwIcon />
</button>
