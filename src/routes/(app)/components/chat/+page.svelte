<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from "$lib/components/demo.svelte";
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
</script>

<Demo demo="chat"/>
<Subheading>Installation</Subheading>
<Add item="chat"/>
<Subheading>Usage</Subheading>
<Code
	lang="svelte"
	code={`\<script lang="ts"\>
	import * as Chat from "$lib/components/ui/chat";
\<\/script\>

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
</Chat.List>`}
/>
<Subheading>Acknowledgements</Subheading>
<p>
	This component takes inspiration from
	<Link href="https://github.com/jakobhoeg/shadcn-chat" target="_blank">
		jakobhoeg/shadcn-chat
	</Link>.
</p>
