---
title: 'Light Switch'
description: 'Click and change the theme.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="light-switch" />

## Installation

<Add item="light-switch" />

## Usage

Include [`ModeWatcher`](https://github.com/svecosystem/mode-watcher) from `mode-watcher` in your root layout so theme changes apply app-wide.

```svelte
<script lang="ts">
	import { LightSwitch } from '$lib/components/ui/light-switch';
</script>

<LightSwitch />
```

## Ghost

<Demo demo="light-switch-variants" />

<ApiReference />
