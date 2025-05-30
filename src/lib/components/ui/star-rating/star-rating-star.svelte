<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import { StarHalfIcon, StarIcon } from '@lucide/svelte';
	import { unstable_RatingGroup as RatingGroup } from 'bits-ui';

	type Props = {
		index: number;
		state: 'active' | 'partial' | 'inactive';
		class?: string;
	};

	let { index, state, class: className }: Props = $props();
</script>

<RatingGroup.Item
	{index}
	class={cn(
		'ring-ring text-primary ring-offset-background group/item size-5 rounded-md ring-offset-2 outline-hidden group-aria-disabled:opacity-50 focus-visible:ring-2',
		className
	)}
>
	<div class="relative size-full">
		<StarIcon
			class={cn('size-full fill-transparent transition-all', {
				'fill-current': state === 'active'
			})}
		/>
		<StarHalfIcon
			class={cn(
				'absolute top-0 left-0 size-full fill-transparent transition-all group-data-[state=active]/item:fill-current',
				{
					'ltr:fill-current': state === 'partial'
				}
			)}
		/>
		<StarHalfIcon
			class={cn(
				'absolute top-0 right-0 size-full scale-x-[-1] fill-transparent transition-all group-data-[state=active]/item:fill-current',
				{
					'rtl:fill-current': state === 'partial'
				}
			)}
		/>
	</div>
</RatingGroup.Item>
