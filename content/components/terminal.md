---
title: "Terminal"
description: "An implementation of the MacOS terminal. Useful for showcasing a command line interface."
---

<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n\timport * as Terminal from '$lib/components/ui/terminal';\n\\<\\/script\\>\n\n<Terminal.Root>\n\t<Terminal.TypingAnimation/>\n\t<Terminal.AnimatedSpan/>\n</Terminal.Root>";
	const _docCode1 = "\\<script lang=\"ts\"\\>\n\timport * as Terminal from '$lib/components/ui/terminal';\n\\<\\/script\\>\n\n<Terminal.Root delay={250}>\n\t<Terminal.TypingAnimation/>\n\t<Terminal.AnimatedSpan/>\n</Terminal.Root>";
	const _docCode2 = "\\<script lang=\"ts\"\\>\n\timport * as Terminal from '$lib/components/ui/terminal';\n\\<\\/script\\>\n\n<!-- half speed -->\n<Terminal.Root speed={0.5}>\n\t<Terminal.TypingAnimation/>\n\t<Terminal.AnimatedSpan/>\n</Terminal.Root>";
</script>

<Demo demo="terminal" />
<Subheading>Installation</Subheading>
<Add item="terminal" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={_docCode0}
	/>
</div>
<p>
	You can add a delay to
	<CodeSpan>
		{`<Terminal.Root/>`}
	</CodeSpan> to delay every animation by that amount of time:
</p>
<div>
	<Code
		lang="svelte"
		highlight={[5]}
		code={_docCode1}
	/>
</div>
<p>
	You can also change the speed of all animations from
	<CodeSpan>
		{`<Terminal.Root/>`}
	</CodeSpan>:
</p>
<div>
	<Code
		lang="svelte"
		highlight={[5, 6]}
		code={_docCode2}
	/>
</div>
<Subheading>Loop</Subheading>
<p>
	You can make the terminal preview continuously loop using the
	<CodeSpan>
		{'<Terminal.Loop/>'}
	</CodeSpan> component.
</p>
<Demo demo="terminal-loop" />
<Subheading>Acknowledgements</Subheading>
<p>
	This component was inspired by
	<Link href="https://magicui.design/docs/components/terminal" target="_blank">
		magicuidesign/magicui
	</Link>.
</p>
