<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from "$lib/components/demo.svelte";
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="toc"/>
<Subheading>Installation</Subheading>
<Add item="toc"/>
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
