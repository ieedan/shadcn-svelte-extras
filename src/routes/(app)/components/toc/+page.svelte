<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/demo.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { examples } from './examples';
</script>

<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/toc" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import * as Toc from '$lib/components/ui/toc';
\<\/script\>

<Toc.Root />`}
	/>
</div>
<Subheading>Generate the table of contents with UseToc</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import * as Toc from '$lib/components/ui/toc';

	const toc = new UseToc();
\<\/script\>

<div bind:this={toc.ref}>
	<!-- page contents -->
</div>
<Toc.Root toc={toc.current}/>`}
	/>
</div>
