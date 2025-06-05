<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { examples } from './examples';
	import { SnippetReference } from '$lib/components/docs/api-reference/components';
	import ApiReference from '$lib/components/docs/api-reference/api-reference.svelte';
</script>

<Subheading class="mt-0">Basic</Subheading>
<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/snippet" />
<Subheading>Variants</Subheading>
<Playground code={examples.variants.code}>
	<examples.variants.Component />
</Playground>
<Subheading>Multiline</Subheading>
<Playground code={examples.multiline.code}>
	<examples.multiline.Component />
</Playground>
<ApiReference name="Snippet" components={SnippetReference} />
