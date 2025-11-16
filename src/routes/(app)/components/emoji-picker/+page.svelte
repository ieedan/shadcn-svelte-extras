<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
</script>

<Demo demo="emoji-picker" />
<Subheading>Installation</Subheading>
<Add item="emoji-picker" />
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
		<EmojiPicker.Footer>
			<EmojiPicker.SkinToneSelector />
		</EmojiPicker.Footer>
	</EmojiPicker.Viewport>
</EmojiPicker.Root>`}
	/>
</div>
<Subheading>Default Skin</Subheading>
<Demo demo="emoji-picker-skin" />
<Subheading>Popover</Subheading>
<Demo demo="emoji-picker-popover" />
<Subheading>Footer</Subheading>
<Demo demo="emoji-picker-footer" />
<Subheading>Recents</Subheading>
<p>
	You can show a list of recently used emojis by passing the <CodeSpan>showRecents</CodeSpan> prop.
</p>
<p>
	The list is sorted by frecency meaning emojis used more are at the top and 2 emojis with the same
	amount of uses will be sorted by the last time they were used.
</p>
<Demo demo="emoji-picker-recents" />
<Subheading>Acknowledgements</Subheading>
<p>
	The API and style of this component takes inspiration from
	<Link href="https://frimousse.liveblocks.io/" target="_blank">Frimousse</Link>.
</p>
