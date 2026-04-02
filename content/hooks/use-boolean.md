---
title: "UseBoolean"
description: "A hook to simplify working with boolean values."
---

<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n    let enabled = $state(true);\n\\<\\/script\\>\n\n<button onclick={() => enabled = false}>\n    Disable\n</button>";
	const _docCode1 = "\\<script lang=\"ts\"\\>\n    import { UseBoolean } from '$lib/hooks/use-boolean.svelte';\n\n    const enabled = new UseBoolean(true);\n\\<\\/script\\>\n\n<button onclick={enabled.setFalse}>\n    Disable\n</button>";
</script>

<Subheading>Installation</Subheading>
<Add item="use-boolean" />
<Subheading>Usage</Subheading>
<p>Use this hook to manage boolean values with more concise syntax.</p>
<p>Before:</p>
<div>
	<Code
		lang="svelte"
		code={_docCode0}
	/>
</div>
<p>After:</p>
<div>
	<Code
		lang="svelte"
		highlight={[2, 4, 7]}
		code={_docCode1}
	/>
</div>
<Subheading>Acknowledgements</Subheading>
<p>
	This hook was inspired by
	<Link href="https://hookcn.ouassim.tech/docs/hooks/use-boolean" target="_blank">
		strlrd-29/hookcn
	</Link>.
</p>
