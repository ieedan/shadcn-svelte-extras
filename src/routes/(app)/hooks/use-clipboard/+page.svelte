<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Subheading>Installation</Subheading>
<Add item="use-clipboard" />
<Subheading>Usage</Subheading>
<p>Create a button that copies some text to the clipboard.</p>
<div>
	<Code
		lang="svelte"
		highlight={[2, 6]}
		code={`\<script lang="ts"\>
    import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';

    let { children } = $props();

    const clipboard = new UseClipboard();
\<\/script\>

<button onclick={clipboard.copy('Hello, World!')}>
    {#if clipboard.copied}
        Copied!
    {:else}
        Copy
    {/if}
</button>`}
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
		code={`const clipboard = new UseClipboard({ delay: 500 });`}
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
		code={`\<script lang="ts"\>
    import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';

    let { children } = $props();

    const clipboard = new UseClipboard();
\<\/script\>

<button onclick={clipboard.copy('Hello, World!')}>
    {#if clipboard.status === 'success'}
        Copied!
    {:else if clipboard.status === 'failure'}
        Failed to copy!
    {:else}
        Copy
    {/if}
</button>`}
	/>
</div>
