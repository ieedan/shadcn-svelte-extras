<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { examples } from './examples';
</script>

<Subheading>Basic</Subheading>
<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/ipv4address-input" />
<Subheading>Placeholder</Subheading>
<Playground code={examples.placeholder.code}>
	<examples.placeholder.Component />
</Playground>
<Subheading>Reactive</Subheading>
<Playground code={examples.reactive.code}>
	<examples.reactive.Component />
</Playground>
<Subheading>Validation</Subheading>
<Playground code={examples.valid.code}>
	<examples.valid.Component />
</Playground>
