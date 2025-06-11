<script lang="ts">
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { examples } from './example';
</script>

<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="hooks/use-frecency.svelte" />
