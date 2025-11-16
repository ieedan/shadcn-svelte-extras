<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="link" />
<Subheading>Installation</Subheading>
<Add item="link" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import { Link } from '$lib/components/ui/link';
\<\/script\>

<Link>Hello</Link>`}
	/>
</div>
