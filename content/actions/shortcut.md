---
title: "Shortcut"
description: "An action to create shortcuts for your application."
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="shortcut" />

## Installation

<Add item="shortcut" />

## Usage

```svelte
<!-- Ctrl/Command + K shortcut -->
<svelte:window
		use:shortcut={{
			key: 'k',
			ctrl: true,
			callback: commandMenu.toggle
		}}
/>
```

## Attachment Usage

```svelte
<!-- Ctrl/Command + K shortcut -->
<svelte:window
		{...attachShortcut({
			key: 'k',
			ctrl: true,
			callback: commandMenu.toggle
		})}
/>
```

## Multiple


Configure multiple shortcuts by providing an array of options.


```svelte
<svelte:window
		use:shortcut={[
			{
				key: 'k',
				ctrl: true,
				callback: commandMenu.toggle
			},
			{
				key: 's',
				ctrl: true,
				callback: searchInput.focus
			}
		]}
/>
```

