---
title: "Chat"
description: "Components for creating live chats."
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="chat" />

## Installation

<Add item="chat" />

## Usage

```svelte
<script lang="ts">
	import * as Chat from "$lib/components/ui/chat";
</script>

<Chat.List>
	<Chat.Bubble>
		<Chat.BubbleAvatar>
			<Chat.BubbleAvatarImage 
				src="https://github.com/shadcn.png" 
				alt="@shadcn" 
			/>
			<Chat.BubbleAvatarFallback>
				CN
			</Chat.BubbleAvatarFallback>
		</Chat.BubbleAvatar>
		<Chat.BubbleMessage>
			Hello, World!
		</Chat.BubbleMessage>
	</Chat.Bubble>
</Chat.List>
```

## Acknowledgements

This component takes inspiration from [jakobhoeg/shadcn-chat](https://github.com/jakobhoeg/shadcn-chat).

