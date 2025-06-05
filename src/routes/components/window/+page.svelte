<script lang="ts">
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { examples } from './examples';
	import ApiReference from '$lib/components/docs/api-reference/api-reference.svelte';
	import { WindowReference } from '$lib/components/docs/api-reference/components';
</script>

<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/window" />
<ApiReference name="Window" components={WindowReference} />
