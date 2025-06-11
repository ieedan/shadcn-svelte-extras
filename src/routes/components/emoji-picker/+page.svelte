<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { examples } from './examples';
	import { Link } from '$lib/components/ui/link';
</script>

<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/emoji-picker" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import * as EmojiPicker from '$lib/components/ui/emoji-picker';
\<\/script\>

<EmojiPicker.Root>
	<EmojiPicker.Viewport>
		<EmojiPicker.Search />
		<EmojiPicker.List />
	</EmojiPicker.Viewport>
</EmojiPicker.Root>`}
	/>
</div>
<Subheading>Default Skin</Subheading>
<Playground code={examples.skin.code}>
	<examples.skin.Component />
</Playground>
<Subheading>Popover</Subheading>
<Playground code={examples.popover.code}>
	<examples.popover.Component />
</Playground>
<Subheading>Footer</Subheading>
<Playground code={examples.footer.code}>
	<examples.footer.Component />
</Playground>
<Subheading>Recents</Subheading>
<p>
	You can show a list of recently used emojis by passing the <CodeSpan>showRecents</CodeSpan> prop.
</p>
<p>
	The list is sorted by frecency meaning emojis used more are at the top and 2 emojis with the same
	amount of uses will be sorted by the last time they were used.
</p>
<Playground code={examples.recents.code}>
	<examples.recents.Component />
</Playground>
<Subheading>Acknowledgements</Subheading>
<p>
	The API and style of this component takes inspiration from
	<Link href="https://frimousse.liveblocks.io/" target="_blank">Frimousse</Link>.
</p>
