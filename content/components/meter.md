---
title: "Meter"
description: "A meter component."
---

<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n\timport { Meter } from '$lib/components/ui/meter';\n\\<\\/script\\>\n\n<Meter\n\tvalue={50}\n\tmax={100}\n/>";
</script>

<Demo demo="meter" />
<Subheading>Installation</Subheading>
<Add item="meter" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={_docCode0}
	/>
</div>
