<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import customValidateRaw from './custom-validate.ts?raw';
</script>

<Demo demo="tags-input" />
<Subheading>Installation</Subheading>
<Add item="tags-input" />
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
	<Code lang="typescript" code={customValidateRaw} />
</div>
<p>
	Pass the function to the <CodeSpan>{'<TagsInput/>'}</CodeSpan> component:
</p>
<Demo demo="tags-input-lowercase" />
