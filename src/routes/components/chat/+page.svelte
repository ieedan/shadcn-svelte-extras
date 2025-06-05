<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import ApiReference from '$lib/components/docs/api-reference/api-reference.svelte';
	import { ChatReference } from '$lib/components/docs/api-reference/components';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { Code } from '$lib/components/ui/code';
	import { Link } from '$lib/components/ui/link';
	import { examples } from './examples';
</script>

<Subheading class="mt-0">Basic</Subheading>
<Playground code={examples.basic.code} class="min-h-[625px] p-4">
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/chat" />
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
<ApiReference name="Chat" components={ChatReference} />
<Subheading>Acknowledgements</Subheading>
<p>
	This component takes inspiration from
	<Link href="https://github.com/jakobhoeg/shadcn-chat" target="_blank">
		jakobhoeg/shadcn-chat
	</Link>.
</p>
