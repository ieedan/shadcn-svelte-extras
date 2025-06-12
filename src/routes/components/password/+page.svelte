<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { examples } from './examples';
	import { Link } from '$lib/components/ui/link';
</script>

<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/password" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import * as Password from '$lib/components/ui/password';
\<\/script\>

<Password.Root>
	<Password.Input>
		<Password.Copy/>
		<Password.ToggleVisibility/>
	</Password.Input>
	<Password.Strength />
</Password.Root>`}
	/>
</div>
<Subheading>Toggle Visibility</Subheading>
<p>Add a button to toggle the visibility of the password.</p>
<Playground code={examples.toggleVisibility.code}>
	<examples.toggleVisibility.Component />
</Playground>
<Subheading>Copy</Subheading>
<p>Add a button to copy the secret to the clipboard.</p>
<Playground code={examples.copy.code}>
	<examples.copy.Component />
</Playground>
<Subheading>Both</Subheading>
<p>You can also add both a visibility toggle and a copy button and they will play nicely.</p>
<Playground code={examples.both.code}>
	<examples.both.Component />
</Playground>
<Subheading>Strength</Subheading>
<p>
	Add a strength meter to the password input using
	<Link href="https://zxcvbn-ts.github.io/zxcvbn/">zxcvbn-ts</Link>
</p>
<p>
	When a password is too weak (as determined by the <CodeSpan>minScore</CodeSpan> prop) the input is
	marked as invalid and users will be unable to submit the form.
</p>
<Playground code={examples.strength.code}>
	<examples.strength.Component />
</Playground>
