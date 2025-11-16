<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from "$lib/components/demo.svelte";
	import Add from '$lib/components/add.svelte';
	import shikiRaw from '$lib/components/ui/code/shiki.ts?raw';
</script>

<Demo demo="code"/>
<Subheading>Installation</Subheading>
<Add item="code"/>
<Subheading>Configuring Languages</Subheading>
<p>
	The highlighter and languages can be configured from <CodeSpan>shiki.ts</CodeSpan>.
</p>
<Code
	lang="typescript"
	code={shikiRaw}
	class="h-fit"
	highlight={[
		[5, 12],
		[18, 25]
	]}
/>
<Subheading>Copy Button</Subheading>
<Demo demo="code-copy-button"/>
<Subheading>No Line Numbers</Subheading>
<Demo demo="code-no-line-numbers"/>
<Subheading>Variants</Subheading>
<Demo demo="code-variants"/>
<Subheading>Highlight Lines</Subheading>
<Demo demo="code-highlight-lines"/>
<Subheading>Overflow</Subheading>
<Demo demo="code-overflow"/>
