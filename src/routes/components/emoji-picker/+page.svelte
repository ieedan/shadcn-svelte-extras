<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { examples } from './examples';
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
