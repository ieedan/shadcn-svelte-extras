---
title: "UseToc"
description: "A hook used to generate a table of contents based on the page content"
---

<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Add from '$lib/components/add.svelte';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n    const toc = new UseToc();\n\\<\\/script\\>\n\n<div bind:this={toc.ref}>\n    <h2>Installation</h2>\n    <h3>CLI</h3>\n    <h3>Manual</h3>\n    <h2>Usage</h2>\n</div>";
	const _docCode1 = "\\<script lang=\"ts\"\\>\n    const toc = new UseToc();\n\\<\\/script\\>\n\n<div bind:this={toc.ref}>\n    <h2>Installation</h2>\n    <h3>CLI</h3>\n    <h3 data-toc-ignore>Internal Notes</h3>\n    <h2>Usage</h2>\n    <div data-toc-ignore>\n        <h3>Hidden Section</h3>\n        <h4>This won't appear</h4>\n    </div>\n</div>";
</script>

<Subheading>Installation</Subheading>
<Add item="use-toc" />
<Subheading>Usage</Subheading>
<p>Generate a table of contents using the content of the page.</p>
<div>
	<Code
		lang="svelte"
		highlight={[2, 5]}
		code={_docCode0}
	/>
</div>
<Subheading>Ignoring Headings</Subheading>
<p>
	You can exclude headings from the table of contents by adding the <code>data-toc-ignore</code> attribute
	to the heading itself or to any parent element containing the heading.
</p>
<div>
	<Code
		lang="svelte"
		highlight={[2, 5, 8, 10]}
		code={_docCode1}
	/>
</div>
