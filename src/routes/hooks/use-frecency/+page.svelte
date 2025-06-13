<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { examples } from './example';
</script>

<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="hooks/use-frecency.svelte" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		highlight={[2, 4]}
		code={`\<script lang="ts"\>
    import { UseFrecency } from '$lib/hooks/use-frecency.svelte.js';

    const frecency = new UseFrecency('frecency-key');
\<\/script\>

<p>{frecency.items}</p>`}
	/>
</div>
