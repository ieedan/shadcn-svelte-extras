---
title: "Modal"
description: "A responsive dialog component."
---

<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n\timport * as Modal from \"$lib/components/ui/modal\";\n\\<\\/script\\>\n\n<Modal.Root>\n\t<Modal.Trigger/>\n\t<Modal.Content>\n\t\t<Modal.Header>\n\t\t\t<Modal.Title/>\n\t\t\t<Modal.Description/>\n\t\t</Modal.Header>\n\t\t<Modal.Footer/>\n\t</Modal.Content>\n</Modal.Root>";
</script>

<Demo demo="modal" />
<Subheading>Installation</Subheading>
<Add item="modal" />
<Subheading class="mt-0">Usage</Subheading>
<p>The modal component can be composed just like a dialog or drawer component.</p>
<div>
	<Code
		lang="svelte"
		code={_docCode0}
	/>
</div>
