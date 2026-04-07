---
title: 'GitHub Button'
description: 'A button that displays the number of stars and links to a GitHub repository.'
indicator: 'new'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="github-button" />

## Installation

<Add item="github-button" />

## Usage

```svelte
<script lang="ts">
	import { GitHubButton } from '$lib/components/ui/github-button';

	const repo = { owner: 'ieedan', repo: 'shadcn-svelte-extras' };
	const stars = 500;
</script>

<GitHubButton {repo} {stars} />
```

## Icon only

If you don't want to display the star count, simply don't provide a value for `stars`.

<Demo demo="github-button-icon-only" />

<ApiReference />
