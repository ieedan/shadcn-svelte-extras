<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from "$lib/components/demo.svelte";
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="modal"/>
<Subheading>Installation</Subheading>
<Add item="modal"/>
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
