---
title: "Chat"
description: "Components for creating live chats."
---

<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n\timport * as Chat from \"$lib/components/ui/chat\";\n\\<\\/script\\>\n\n<Chat.List>\n\t<Chat.Bubble>\n\t\t<Chat.BubbleAvatar>\n\t\t\t<Chat.BubbleAvatarImage \n\t\t\t\tsrc=\"https://github.com/shadcn.png\" \n\t\t\t\talt=\"@shadcn\" \n\t\t\t/>\n\t\t\t<Chat.BubbleAvatarFallback>\n\t\t\t\tCN\n\t\t\t</Chat.BubbleAvatarFallback>\n\t\t</Chat.BubbleAvatar>\n\t\t<Chat.BubbleMessage>\n\t\t\tHello, World!\n\t\t</Chat.BubbleMessage>\n\t</Chat.Bubble>\n</Chat.List>";
</script>

<Demo demo="chat" />
<Subheading>Installation</Subheading>
<Add item="chat" />
<Subheading>Usage</Subheading>
<Code
	lang="svelte"
	code={_docCode0}
/>
<Subheading>Acknowledgements</Subheading>
<p>
	This component takes inspiration from
	<Link href="https://github.com/jakobhoeg/shadcn-chat" target="_blank">
		jakobhoeg/shadcn-chat
	</Link>.
</p>
