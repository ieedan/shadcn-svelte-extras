<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { examples } from './examples';
	import ApiReference from '$lib/components/docs/api-reference/api-reference.svelte';
	import { TocReference } from '$lib/components/docs/api-reference/components';
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
<ApiReference name="Toc" components={TocReference} />
