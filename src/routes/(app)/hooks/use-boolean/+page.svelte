<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
</script>

<Subheading>Installation</Subheading>
<Add item="use-boolean" />
<Subheading>Usage</Subheading>
<p>Use this hook to manage boolean values with more concise syntax.</p>
<p>Before:</p>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
    let enabled = $state(true);
\<\/script\>

<button onclick={() => enabled = false}>
    Disable
</button>`}
	/>
</div>
<p>After:</p>
<div>
	<Code
		lang="svelte"
		highlight={[2, 4, 7]}
		code={`\<script lang="ts"\>
    import { UseBoolean } from '$lib/hooks/use-boolean.svelte';

    const enabled = new UseBoolean(true);
\<\/script\>

<button onclick={enabled.setFalse}>
    Disable
</button>`}
	/>
</div>
<Subheading>Acknowledgements</Subheading>
<p>
	This hook was inspired by
	<Link href="https://hookcn.ouassim.tech/docs/hooks/use-boolean" target="_blank">
		strlrd-29/hookcn
	</Link>.
</p>
