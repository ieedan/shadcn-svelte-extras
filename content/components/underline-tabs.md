---
title: 'Underline Tabs'
description: 'A horizontal tabs component with an underline.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="underline-tabs" />

## Installation

<Add item="underline-tabs" />

## Usage

```svelte
<script lang="ts">
	import * as UnderlineTabs from '$lib/components/ui/underline-tabs';
</script>

<UnderlineTabs.Root value="overview">
	<UnderlineTabs.List>
		<UnderlineTabs.Trigger value="overview">Overview</UnderlineTabs.Trigger>
		<UnderlineTabs.Trigger value="settings">Settings</UnderlineTabs.Trigger>
	</UnderlineTabs.List>
</UnderlineTabs.Root>
```

## Overflow

<Demo demo="underline-tabs-overflow" />

<ApiReference />
