<script lang="ts">
	import * as StarRating from '$lib/components/ui/star-rating';
</script>

<StarRating.Root>
	{#snippet children({ items })}
		{#each items as item (item.index)}
			<StarRating.Star {...item} class="text-yellow-400" />
		{/each}
	{/snippet}
</StarRating.Root>
