<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { examples } from './examples';
	import ApiReference from '$lib/components/docs/api-reference/api-reference.svelte';
	import { TagsInputReference } from '$lib/components/docs/api-reference/components';
</script>

<Subheading class="mt-0">Basic</Subheading>
<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/tags-input" />
<Subheading class="mt-0">Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import { TagsInput } from "$lib/components/ui/tags-input";
\<\/script\>

<TagsInput/>`}
	/>
</div>
<Subheading>Custom Validation</Subheading>
<p>
	For most of the validation and transformation you will need to do you can use the
	<CodeSpan>validate</CodeSpan> property.
</p>
<p>For example let's say you want to make all of the tags lowercase.</p>
<p>Write a custom validate function:</p>
<div>
	<Code lang="typescript" code={examples.customValidateCode} />
</div>
<p>
	Pass the function to the <CodeSpan>{'<TagsInput/>'}</CodeSpan> component:
</p>
<Playground code={examples.lowercase.code}>
	<examples.lowercase.Component />
</Playground>

<ApiReference name="TagsInput" components={TagsInputReference} />
