<script lang="ts">
	import * as StarRating from '$lib/components/ui/star-rating';
</script>

<StarRating.Root max={10}>
	{#snippet children({ items })}
		{#each items as item (item.index)}
			<StarRating.Star {...item} />
		{/each}
	{/snippet}
</StarRating.Root>
