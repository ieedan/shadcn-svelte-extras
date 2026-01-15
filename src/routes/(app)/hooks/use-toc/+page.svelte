<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Subheading>Installation</Subheading>
<Add item="use-toc" />
<Subheading>Usage</Subheading>
<p>Generate a table of contents using the content of the page.</p>
<div>
	<Code
		lang="svelte"
		highlight={[2, 5]}
		code={`\<script lang="ts"\>
    const toc = new UseToc();
\<\/script\>

<div bind:this={toc.ref}>
    <h2>Installation</h2>
    <h3>CLI</h3>
    <h3>Manual</h3>
    <h2>Usage</h2>
</div>`}
	/>
</div>
<Subheading>Ignoring Headings</Subheading>
<p>
	You can exclude headings from the table of contents by adding the <code>data-toc-ignore</code> attribute
	to the heading itself or to any parent element containing the heading.
</p>
<div>
	<Code
		lang="svelte"
		highlight={[2, 5, 8, 10]}
		code={`\<script lang="ts"\>
    const toc = new UseToc();
\<\/script\>

<div bind:this={toc.ref}>
    <h2>Installation</h2>
    <h3>CLI</h3>
    <h3 data-toc-ignore>Internal Notes</h3>
    <h2>Usage</h2>
    <div data-toc-ignore>
        <h3>Hidden Section</h3>
        <h4>This won't appear</h4>
    </div>
</div>`}
	/>
</div>
