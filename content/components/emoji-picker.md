---
title: 'Emoji Picker'
description: 'A composable emoji picker component.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="emoji-picker" />

## Installation

<Add item="emoji-picker" />

## Usage

```svelte
<script lang="ts">
	import * as EmojiPicker from '$lib/components/ui/emoji-picker';
</script>

<EmojiPicker.Root>
	<EmojiPicker.Viewport>
		<EmojiPicker.Search />
		<EmojiPicker.List />
		<EmojiPicker.Footer>
			<EmojiPicker.SkinToneSelector />
		</EmojiPicker.Footer>
	</EmojiPicker.Viewport>
</EmojiPicker.Root>
```

## Default Skin

<Demo demo="emoji-picker-skin" />

## Popover

<Demo demo="emoji-picker-popover" />

## Footer

<Demo demo="emoji-picker-footer" />

## Recents

You can show a list of recently used emojis by passing the `showRecents` prop.

The list is sorted by frecency meaning emojis used more are at the top and 2 emojis with the same
amount of uses will be sorted by the last time they were used.

<Demo demo="emoji-picker-recents" />

## Acknowledgements

The API and style of this component takes inspiration from [Frimousse](https://frimousse.liveblocks.io/).
