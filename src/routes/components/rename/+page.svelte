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
<Installation specifier="ui/rename" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import * as Rename from '$lib/components/ui/rename';
\<\/script\>

<Rename.Provider>
	<Rename.Root />
	<Rename.Save />
	<Rename.Cancel />
	<Rename.Edit />
</Rename.Provider>

<!-- or -->

<!-- Content editable mode -->
<Rename.Root />
`}
	/>
</div>
<Subheading>Content Editable</Subheading>
<p>When in content editable mode the user can click on the text to start editing it.</p>
<Playground code={examples.contentEditable.code}>
	<examples.contentEditable.Component />
</Playground>
