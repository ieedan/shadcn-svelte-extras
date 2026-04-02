---
title: "Star Rating"
description: "A simple star rating component."
---

<script lang="ts">

	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
</script>

## Basic


The `<StarRating/>` component builds on top of the <Link href="https://bits-ui.com" target="_blank"
		>bits-ui</Link
	> `<RatingGroup/>` component so it has all the behaviors you'd expect.


<Demo demo="star-rating" />

## Installation

<Add item="star-rating" />

## Usage

```svelte
<script lang="ts">
	import * as StarRating from '$lib/components/ui/star-rating';
</script>

<StarRating.Root>
	{#snippet children({ items })}
		{#each items as item (item.index)}
			<StarRating.Star {...item} />
		{/each}
	{/snippet}
</StarRating.Root>
```

## Custom Stars


You can have an arbitrary number of stars.


<Demo demo="star-rating-custom-stars" />

## Half Rating


You can also have half ratings. And they even work in RTL!


<Demo demo="star-rating-half-rating" />

## Disabled

<Demo demo="star-rating-disabled" />

## Readonly

<Demo demo="star-rating-readonly" />

## Custom Color

<Demo demo="star-rating-custom-color" />

## Custom Size

<Demo demo="star-rating-custom-size" />
