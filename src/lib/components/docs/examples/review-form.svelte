<script>
	import { Button } from '$lib/components/ui/button';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import * as StarRating from '$lib/components/ui/star-rating';

	let loading = $state(false);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Write a Review</Card.Title>
		<Card.Description>Tell us about your experience using acme.com</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<div>
				<Label>Comment</Label>
				<Textarea placeholder="Tell us about your experience..." />
			</div>
			<div>
				<Label>Overall Rating</Label>
				<StarRating.Root value={1}>
					{#snippet children({ stars })}
						{#each stars as star (star)}
							<StarRating.Star {star} />
						{/each}
					{/snippet}
				</StarRating.Root>
			</div>
		</div>
		<Button
			{loading}
			class="w-full"
			onclick={() => {
				loading = true;
				setTimeout(() => {
					loading = false;
				}, 500);
			}}
		>
			Submit
		</Button>
	</Card.Content>
</Card.Root>
