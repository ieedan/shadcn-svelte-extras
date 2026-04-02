---
title: "UseMedia"
description: "A hook to track the size of the screen using the standard Tailwind CSS breakpoints."
---

<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n    import { useMedia } from '$lib/hooks/use-media.svelte';\n\n    const media = useMedia();\n\\<\\/script\\>\n\n{media.sm}\n";
</script>

<Demo demo="use-media" />
<Subheading>Installation</Subheading>
<Add item="use-media" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		highlight={[2, 4]}
		code={_docCode0}
	/>
</div>
<Subheading>Custom Breakpoints</Subheading>
<p>You can also define your own breakpoints and get full type safety.</p>
<Demo demo="use-media-custom" />
