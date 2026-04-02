---
title: "Password"
description: "Components for handling passwords and other secrets."
---

<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n\timport * as Password from '$lib/components/ui/password';\n\\<\\/script\\>\n\n<Password.Root>\n\t<Password.Input>\n\t\t<Password.Copy/>\n\t\t<Password.ToggleVisibility/>\n\t</Password.Input>\n\t<Password.Strength />\n</Password.Root>";
</script>

<Demo demo="password" />
<Subheading>Installation</Subheading>
<Add item="password" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={_docCode0}
	/>
</div>
<Subheading>Toggle Visibility</Subheading>
<p>Add a button to toggle the visibility of the password.</p>
<Demo demo="password-toggle-visibility" />
<Subheading>Copy</Subheading>
<p>Add a button to copy the secret to the clipboard.</p>
<Demo demo="password-copy" />
<Subheading>Both</Subheading>
<p>You can also add both a visibility toggle and a copy button and they will play nicely.</p>
<Demo demo="password-both" />
<Subheading>Strength</Subheading>
<p>
	Add a strength meter to the password input using
	<Link href="https://zxcvbn-ts.github.io/zxcvbn/" target="_blank">zxcvbn-ts</Link>
</p>
<p>
	When a password is too weak (as determined by the <CodeSpan>minScore</CodeSpan> prop) the input is marked
	as invalid and users will be unable to submit the form.
</p>
<Demo demo="password-strength" />
