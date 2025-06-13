<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
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
		highlight={[2, 4]}
		code={`\<script lang="ts"\>
    import { IsMac } from '$lib/hooks/is-mac.svelte.js';

    const isMac = new IsMac();
\<\/script\>

<p>{isMac.current ? '⌘' : 'Ctrl'}</p>`}
	/>
</div>
<Subheading>Acknowledgements</Subheading>
<p>
	This hook is based on the shadcn-svelte
	<Link
		href="https://github.com/huntabyte/shadcn-svelte/blob/main/docs/src/lib/hooks/use-is-mac.svelte.ts"
		target="_blank"
	>
		useIsMac
	</Link> hook.
</p>
