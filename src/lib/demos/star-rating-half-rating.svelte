<script lang="ts">
	import * as StarRating from '$lib/components/ui/star-rating';

	let value = $state(3.5);
</script>

<div class="flex flex-col gap-2">
	<div>
		<StarRating.Root allowHalf bind:value>
			{#snippet children({ items })}
				{#each items as item (item.index)}
					<StarRating.Star {...item} />
				{/each}
			{/snippet}
		</StarRating.Root>
		<span class="text-muted-foreground text-sm">Rating is {value}</span>
	</div>
	<div dir="rtl">
		<span class="text-muted-foreground text-sm">تقييم بالنجوم (RTL)</span>
		<StarRating.Root allowHalf value={3.5}>
			{#snippet children({ items })}
				{#each items as item (item.index)}
					<StarRating.Star {...item} />
				{/each}
			{/snippet}
		</StarRating.Root>
	</div>
</div>
