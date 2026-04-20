---
title: 'Split Button'
description: 'Allow users to select which action to perform from a list of options.'
indicator: 'new'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="split-button" />

## Installation

<Add item="split-button" />

## Usage

```svelte
<script lang="ts">
	import * as SplitButton from '$lib/components/ui/split-button';
</script>

<SplitButton.Root>
	<SplitButton.Action value="merge">Merge changes</SplitButton.Action>
	<SplitButton.Action value="squash">Squash and merge</SplitButton.Action>
	<SplitButton.Action value="rebase">Rebase and merge</SplitButton.Action>
	<SplitButton.Select>
		<SplitButton.SelectTrigger />
		<SplitButton.SelectContent>
			<SplitButton.SelectGroup>
				<SplitButton.SelectAction value="merge">Create a merge commit</SplitButton.SelectAction>
				<SplitButton.SelectAction value="squash">Squash and merge</SplitButton.SelectAction>
				<SplitButton.SelectAction value="rebase">Rebase and merge</SplitButton.SelectAction>
			</SplitButton.SelectGroup>
		</SplitButton.SelectContent>
	</SplitButton.Select>
</SplitButton.Root>
```

<ApiReference />
