<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import { Star } from '@lucide/svelte';
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
		class="absolute inset-0 rounded-md outline-none ring-ring ring-offset-2 ring-offset-background focus-visible:ring-2"
	/>
	<Label.Root for="rating-{star}-{id}">
		<Star
			data-selected={starState.rootState.opts.value.current >= star}
			class={cn(
				'size-5 fill-transparent text-primary transition-all group-aria-disabled:opacity-50 data-[selected=true]:fill-primary',
				className
			)}
		/>
	</Label.Root>
</div>
