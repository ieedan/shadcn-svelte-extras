<script lang="ts">
	import * as StarRating from '$lib/components/ui/star-rating';
</script>

<StarRating.Root disabled value={3}>
	{#snippet children({ stars })}
		{#each stars as star (star)}
			<StarRating.Star {star} />
		{/each}
	{/snippet}
</StarRating.Root>
