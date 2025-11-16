<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="meter" />
<Subheading>Installation</Subheading>
<Add item="meter" />
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
