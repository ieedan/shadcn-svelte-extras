<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/demo.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { examples } from './examples';
	import { Link } from '$lib/components/ui/link';
</script>

<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="hooks/is-mac.svelte" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		highlight={[2, 5]}
		code={`\<script lang="ts"\>
    import { isMac } from '$lib/hooks/is-mac.svelte.js';
\<\/script\>

<p>{isMac ? 'Mac' : 'Not Mac'}</p>`}
	/>
</div>
<Subheading>Keys</Subheading>
<p>
	Often times you'll want to show modifier keys in your UI. You can do this with the exported
	<CodeSpan>cmdOrCtrl</CodeSpan> and <CodeSpan>optionOrAlt</CodeSpan> variables.
</p>
<Playground code={examples.keys.code}>
	<examples.keys.Component />
</Playground>
<Subheading>Acknowledgements</Subheading>
<p>
	This hook is based on the shadcn-svelte
	<Link
		href="https://github.com/huntabyte/shadcn-svelte/blob/main/docs/src/lib/hooks/use-is-mac.svelte.ts"
		target="_blank"
	>
		useIsMac
	</Link> hook, as well as some useful enhancements by <Link
		href="https://github.com/tglide"
		target="_blank"
	>
		Thomas G. Lopes
	</Link>
</p>
