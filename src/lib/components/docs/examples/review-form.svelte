<script>
	import Button from '$lib/components/button.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Label } from '$lib/components/ui/label';
	import * as Card from '$lib/components/ui/card';
	import * as StarRating from '$lib/components/ui/star-rating';
	import * as Field from '$lib/components/ui/field';

	let loading = $state(false);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Write a Review</Card.Title>
		<Card.Description>Tell us about your experience using acme.com</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col gap-4">
		<Field.Group>
			<Field.Field>
				<Label>Comment</Label>
				<Textarea placeholder="Tell us about your experience..." />
			</Field.Field>
			<Field.Field>
				<Label>Overall Rating</Label>
				<StarRating.Root value={1}>
					{#snippet children({ items })}
						{#each items as item (item.index)}
							<StarRating.Star {...item} />
						{/each}
					{/snippet}
				</StarRating.Root>
			</Field.Field>
		</Field.Group>
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
