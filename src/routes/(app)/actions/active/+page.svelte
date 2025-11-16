<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<p>
	Adds a <CodeSpan>data-active</CodeSpan> attribute to the
	<CodeSpan>
		{`<a/>`}
	</CodeSpan> tag to be used for styling.
</p>
<Demo demo="active" />
<Subheading>Installation</Subheading>
<Add item="active" />
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
