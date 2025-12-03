<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { RatingGroup, type RatingGroupRootProps } from 'bits-ui';

	let {
		value = $bindable(0),
		max = 5,
		orientation = 'horizontal',
		class: className,
		...rest
	}: RatingGroupRootProps = $props();
</script>

<RatingGroup.Root
	class={cn('group flex w-fit place-items-center gap-1 rounded-md outline-hidden', className)}
	bind:value
	{max}
	{orientation}
	{...rest}
/>
