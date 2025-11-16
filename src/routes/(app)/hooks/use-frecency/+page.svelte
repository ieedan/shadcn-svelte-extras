<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="use-frecency" />
<Subheading>Installation</Subheading>
<Add item="use-frecency" />
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
