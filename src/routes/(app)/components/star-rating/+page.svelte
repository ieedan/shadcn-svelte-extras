<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
</script>

<Subheading class="mt-0">Basic</Subheading>
<p>
	The <CodeSpan>{'<StarRating/>'}</CodeSpan> component builds on top of the <Link
		href="https://bits-ui.com"
		target="_blank">bits-ui</Link
	>
	<CodeSpan>{'<RatingGroup/>'}</CodeSpan> component so it has all the behaviors you'd expect.
</p>
<Demo demo="star-rating" />
<Subheading>Installation</Subheading>
<Add item="star-rating" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import * as StarRating from '$lib/components/ui/star-rating';
\<\/script\>

<StarRating.Root>
	{#snippet children({ items })}
		{#each items as item (item.index)}
			<StarRating.Star {...item} />
		{/each}
	{/snippet}
</StarRating.Root>`}
	/>
</div>
<Subheading>Custom Stars</Subheading>
<p>You can have an arbitrary number of stars.</p>
<Demo demo="star-rating-custom-stars" />
<Subheading>Half Rating</Subheading>
<p>You can also have half ratings. And they even work in RTL!</p>
<Demo demo="star-rating-half-rating" />
<Subheading>Disabled</Subheading>
<Demo demo="star-rating-disabled" />
<Subheading>Readonly</Subheading>
<Demo demo="star-rating-readonly" />
<Subheading>Custom Color</Subheading>
<Demo demo="star-rating-custom-color" />
<Subheading>Custom Size</Subheading>
<Demo demo="star-rating-custom-size" />
