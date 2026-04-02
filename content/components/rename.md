---
title: "Rename"
description: "A component for renaming stuff."
---

<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n\timport * as Rename from '$lib/components/ui/rename';\n\\<\\/script\\>\n\n<Rename.Provider>\n\t<Rename.Root />\n\t<Rename.Save />\n\t<Rename.Cancel />\n\t<Rename.Edit />\n</Rename.Provider>\n\n<!-- or -->\n\n<!-- Content editable mode -->\n<Rename.Root />\n";
</script>

<Demo demo="rename" />
<Subheading>Installation</Subheading>
<Add item="rename" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={_docCode0}
	/>
</div>
<Subheading>Content Editable</Subheading>
<p>When in content editable mode the user can click on the text to start editing it.</p>
<Demo demo="rename-content-editable" />

<Subheading>Text Area</Subheading>
<p>
	The <CodeSpan>Rename</CodeSpan> component can also be a <CodeSpan>textarea</CodeSpan> by setting the
	<CodeSpan>inputTag</CodeSpan> prop to <CodeSpan>'textarea'</CodeSpan>.
</p>
<Demo demo="rename-text-area" />

<Subheading>External Control</Subheading>
<p>
	You can put the <CodeSpan>Rename</CodeSpan> component into edit mode by using the <CodeSpan
		>Edit</CodeSpan
	> component or by setting the <CodeSpan>mode</CodeSpan> prop to <CodeSpan>'edit'</CodeSpan>.
</p>
<Demo demo="rename-context-menu" />
