<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { examples } from './examples';
	import shikiRaw from '$lib/components/ui/code/shiki.ts?raw';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
	import { CodeReference } from '$lib/docs/api-reference/components';
</script>

<Subheading class="mt-0">Basic</Subheading>
<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/code" />
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
<Playground code={examples.copyButton.code}>
	<examples.copyButton.Component />
</Playground>
<Subheading>No Line Numbers</Subheading>
<Playground code={examples.noLineNumbers.code}>
	<examples.noLineNumbers.Component />
</Playground>
<Subheading>Variants</Subheading>
<Playground code={examples.variants.code}>
	<examples.variants.Component />
</Playground>
<Subheading>Highlight Lines</Subheading>
<Playground code={examples.highlightLines.code} class="h-[500px]">
	<examples.highlightLines.Component />
</Playground>
<Subheading>Overflow</Subheading>
<Playground code={examples.overflow.code}>
	<examples.overflow.Component />
</Playground>
<ApiReference name="Code" components={CodeReference} />
