<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { examples } from './examples';
</script>

<Subheading class="mt-0">Basic</Subheading>
<Playground code={examples.basic.code} class="min-h-[300px]">
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/tree-view" />
<Subheading>Custom Icons</Subheading>
<Playground code={examples.customIcons.code} class="min-h-[300px]">
	<examples.customIcons.Component />
</Playground>
<p>
	If you are using custom icons in a project we recommend you wrap the folder/file components with
	the custom icons:
</p>
<div>
	<Code lang="svelte" highlight={[[13, 21]]} code={examples.customFileComponentCode} />
</div>
