---
title: "UseFrecency"
description: "A hook to track and sort items based on their frequency of use."
---

<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n    import { UseFrecency } from '$lib/hooks/use-frecency.svelte.js';\n\n    const frecency = new UseFrecency('frecency-key');\n\\<\\/script\\>\n\n<p>{frecency.items}</p>";
</script>

<Demo demo="use-frecency" />
<Subheading>Installation</Subheading>
<Add item="use-frecency" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		highlight={[2, 4]}
		code={_docCode0}
	/>
</div>
