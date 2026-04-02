---
title: "Link"
description: "A simple link component."
---

<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n\timport { Link } from '$lib/components/ui/link';\n\\<\\/script\\>\n\n<Link>Hello</Link>";
</script>

<Demo demo="link" />
<Subheading>Installation</Subheading>
<Add item="link" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={_docCode0}
	/>
</div>
