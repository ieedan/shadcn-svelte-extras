<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { Code } from '$lib/components/ui/code';
	import { examples } from './examples';
</script>

<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/modal" />
<Subheading class="mt-0">Usage</Subheading>
<p>The modal component can be composed just like a dialog or drawer component.</p>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import * as Modal from "$lib/components/ui/modal";
\<\/script\>

<Modal.Root>
	<Modal.Trigger/>
	<Modal.Content>
		<Modal.Header>
			<Modal.Title/>
			<Modal.Description/>
		</Modal.Header>
		<Modal.Footer/>
	</Modal.Content>
</Modal.Root>`}
	/>
</div>
