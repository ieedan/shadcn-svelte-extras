---
title: 'Theme Selector'
description: 'Click to select the theme.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="theme-selector" />

## Installation

<Add item="theme-selector" />

## Usage

Include [`ModeWatcher`](https://github.com/svecosystem/mode-watcher) from `mode-watcher` in your root layout so selecting a theme applies app-wide.

```svelte
<script lang="ts">
	import { ThemeSelector } from '$lib/components/ui/theme-selector';
</script>

<ThemeSelector />
```

## Ghost

<Demo demo="theme-selector-variants" />

<ApiReference />
