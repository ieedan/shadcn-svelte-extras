<script lang="ts">
	import * as StarRating from '$lib/components/ui/star-rating';

	let value = $state(0);
</script>

<div>
	<StarRating.Root bind:value>
		{#snippet children({ items })}
			{#each items as item (item.index)}
				<StarRating.Star {...item} />
			{/each}
		{/snippet}
	</StarRating.Root>
	<span class="text-muted-foreground text-sm">Rating is {value}</span>
</div>
