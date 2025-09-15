<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { examples } from './examples';
</script>

<Playground code={examples.basic.code} replay>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/meter" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import { Meter } from '$lib/components/ui/meter';
\<\/script\>

<Meter
	value={50}
	max={100}
/>`}
	/>
</div>
