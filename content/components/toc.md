---
title: "Table of Contents"
description: "A component for displaying a table of contents."
---

<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n\timport * as Toc from '$lib/components/ui/toc';\n\\<\\/script\\>\n\n<Toc.Root />";
	const _docCode1 = "\\<script lang=\"ts\"\\>\n\timport * as Toc from '$lib/components/ui/toc';\n\n\tconst toc = new UseToc();\n\\<\\/script\\>\n\n<div bind:this={toc.ref}>\n\t<!-- page contents -->\n</div>\n<Toc.Root toc={toc.current}/>";
</script>

<Demo demo="toc" />
<Subheading>Installation</Subheading>
<Add item="toc" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={_docCode0}
	/>
</div>
<Subheading>Generate the table of contents with UseToc</Subheading>
<div>
	<Code
		lang="svelte"
		code={_docCode1}
	/>
</div>
