<script lang="ts">
	import MaximizeIcon from '@lucide/svelte/icons/maximize';
	import { useDemoFullscreen } from './demo.svelte.js';
	import { cn } from '$lib/utils.js';
	import { controlVariants } from './index.js';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { WithElementRef } from 'bits-ui';

	let {
		ref = $bindable(null),
		class: className,
		...rest
	}: WithElementRef<Omit<HTMLButtonAttributes, 'aria-label' | 'onclick' | 'type'>> = $props();

	const fullscreenState = useDemoFullscreen();
</script>

<button
	type="button"
	aria-label="View in fullscreen"
	bind:this={ref}
	class={cn(controlVariants(), className)}
	onclick={fullscreenState.fullscreen}
	{...rest}
>
	<MaximizeIcon />
</button>
