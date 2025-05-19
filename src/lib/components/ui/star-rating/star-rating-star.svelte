<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import { StarIcon } from '@lucide/svelte';
	import { RadioGroup, Label } from 'bits-ui';
	import { useStarRatingStar } from './star-rating.svelte.js';
	import { box } from 'svelte-toolbelt';

	const id = $props.id();

	type Props = {
		star: number;
		class?: string;
	};

	let { star, class: className }: Props = $props();

	const starState = useStarRatingStar({ star: box.with(() => star) });
</script>

<div class="relative">
	<RadioGroup.Item
		id="rating-{star}-{id}"
		value={star.toString()}
		onmouseover={() => starState.setRating()}
		class="ring-ring ring-offset-background absolute inset-0 rounded-md ring-offset-2 outline-hidden focus-visible:ring-2"
	/>
	<Label.Root for="rating-{star}-{id}">
		<StarIcon
			data-selected={starState.rootState.opts.value.current >= star}
			class={cn(
				'text-primary data-[selected=true]:fill-primary size-5 fill-transparent transition-all group-aria-disabled:opacity-50',
				className
			)}
		/>
	</Label.Root>
</div>
