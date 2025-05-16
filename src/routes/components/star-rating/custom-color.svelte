<script lang="ts">
	import * as StarRating from '$lib/components/ui/star-rating';
</script>

<StarRating.Root>
	{#snippet children({ stars })}
		{#each stars as star (star)}
			<StarRating.Star {star} class="text-yellow-400 data-[selected=true]:fill-yellow-400" />
		{/each}
	{/snippet}
</StarRating.Root>
