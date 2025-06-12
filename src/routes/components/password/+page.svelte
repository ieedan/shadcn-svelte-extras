<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { examples } from './examples';
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
<Subheading>Min Score</Subheading>
<p>Set a minimum score for the password to control when the password is considered valid.</p>
<Playground code={examples.minScore.code}>
	<examples.minScore.Component />
</Playground>
<Subheading>Tainted</Subheading>
<p>The password input won't be styled as invalid until the user has interacted with it.</p>
<Playground code={examples.tainted.code}>
	<examples.tainted.Component />
</Playground>
