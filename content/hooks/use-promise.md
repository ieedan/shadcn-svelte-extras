---
title: "UsePromise"
description: "A hook to manage the state of a promise reactively in the absence of {#await}."
---

<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n    import { UsePromise } from $'lib/hooks/use-promise.svelte.js';\n\n    let { data } = $props();\n\n    const version = new UsePromise(data.version, '1.x.x');\n\\<\\/script\\>\n\n<!-- 1.x.x until resolved -->\n<PMCommand\n    command=\"execute\"\n    args={[\\`jsrepo@\\${version.current}\\`, 'add', 'hooks/use-promise.svelte']}\n/>";
</script>

<Demo demo="use-promise" />
<Subheading>Installation</Subheading>
<Add item="use-promise" />
<Subheading>Usage</Subheading>
<p>Set a default value for the version until it is streamed back from the server.</p>
<div>
	<Code
		lang="svelte"
		highlight={[2, 6, 12]}
		code={_docCode0}
	/>
</div>
