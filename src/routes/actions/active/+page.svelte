<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { Code } from '$lib/components/ui/code';
	import { examples } from './examples';
</script>

<p>
	Adds a <CodeSpan>data-active</CodeSpan> attribute to the
	<CodeSpan>
		{`<a/>`}
	</CodeSpan> tag to be used for styling.
</p>
<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="actions/active" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`<!-- Use data-[active=true] and data-[active=false] to style the link -->
<a 
		href="/docs" 
		use:active 
		class="data-[active=true]:bg-secondary"
>
		Link
</a>`}
	/>
</div>
<Subheading>Attachment Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`<!-- Use data-[active=true] and data-[active=false] to style the link -->
<a 
		href="/docs" 
		{...attachActive()} 
		class="data-[active=true]:bg-secondary"
>
		Link
</a>`}
	/>
</div>
