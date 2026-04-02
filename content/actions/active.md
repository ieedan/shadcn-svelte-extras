---
title: "Active"
description: "An action to determine if a link is active."
---

<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	const _docCode0 = "<!-- Use data-[active=true] and data-[active=false] to style the link -->\n<a \n\t\thref=\"/docs\" \n\t\tuse:active \n\t\tclass=\"data-[active=true]:bg-secondary\"\n>\n\t\tLink\n</a>";
	const _docCode1 = "<!-- Use data-[active=true] and data-[active=false] to style the link -->\n<a \n\t\thref=\"/docs\" \n\t\t{...attachActive()} \n\t\tclass=\"data-[active=true]:bg-secondary\"\n>\n\t\tLink\n</a>";
</script>

<p>
	Adds a <CodeSpan>data-active</CodeSpan> attribute to the
	<CodeSpan>
		{`<a/>`}
	</CodeSpan> tag to be used for styling.
</p>
<Demo demo="active" />
<Subheading>Installation</Subheading>
<Add item="active" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={_docCode0}
	/>
</div>
<Subheading>Attachment Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={_docCode1}
	/>
</div>
