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
<Installation specifier="hooks/use-media.svelte" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		highlight={[2, 4]}
		code={`\<script lang="ts"\>
    import { useMedia } from '$lib/hooks/use-media.svelte';

    const media = useMedia();
\<\/script\>

{media.sm}
`}
	/>
</div>
<Subheading>Custom Breakpoints</Subheading>
<p>You can also define your own breakpoints and get full type safety.</p>
<Playground code={examples.custom.code}>
	<examples.custom.Component />
</Playground>
