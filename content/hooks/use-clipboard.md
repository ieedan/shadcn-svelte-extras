---
title: "UseClipboard"
description: "A hook to simplify copying text to the clipboard."
---

<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Add from '$lib/components/add.svelte';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n    import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';\n\n    let { children } = $props();\n\n    const clipboard = new UseClipboard();\n\\<\\/script\\>\n\n<button onclick={() => clipboard.copy('Hello, World!')}>\n    {#if clipboard.copied}\n        Copied!\n    {:else}\n        Copy\n    {/if}\n</button>";
	const _docCode1 = "const clipboard = new UseClipboard({ delay: 500 });";
	const _docCode2 = "\\<script lang=\"ts\"\\>\n    import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';\n\n    let { children } = $props();\n\n    const clipboard = new UseClipboard();\n\\<\\/script\\>\n\n<button onclick={() => clipboard.copy('Hello, World!')}>\n    {#if clipboard.status === 'success'}\n        Copied!\n    {:else if clipboard.status === 'failure'}\n        Failed to copy!\n    {:else}\n        Copy\n    {/if}\n</button>";
</script>

<Subheading>Installation</Subheading>
<Add item="use-clipboard" />
<Subheading>Usage</Subheading>
<p>Create a button that copies some text to the clipboard.</p>
<div>
	<Code
		lang="svelte"
		highlight={[2, 6]}
		code={_docCode0}
	/>
</div>
<Subheading>Delay</Subheading>
<p>
	So that you can show a status to your users <CodeSpan>UseClipboard</CodeSpan> delays resetting the state
	of
	<CodeSpan>.copied</CodeSpan>. By default this delay is set to 500ms.
</p>
<div>
	<Code
		lang="typescript"
		highlight={[2, 6]}
		code={_docCode1}
	/>
</div>
<Subheading>Status</Subheading>
<p>
	You can check <CodeSpan>.status</CodeSpan> to determine if the copy was a success or failure and update
	the state accordingly.
</p>
<div>
	<Code
		lang="svelte"
		highlight={[2, 6, [10, 16]]}
		code={_docCode2}
	/>
</div>
