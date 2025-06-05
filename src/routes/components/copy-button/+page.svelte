<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { examples } from './examples';
</script>

<Subheading class="mt-0">Basic</Subheading>
<Playground code={examples.basic.code} class="min-h-[225px]">
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/copy-button" />
<Subheading>Custom Icon</Subheading>
<Playground code={examples.icon.code} class="min-h-[225px]">
	<examples.icon.Component />
</Playground>
<Subheading>With Text</Subheading>
<Playground code={examples.withText.code} class="min-h-[225px]">
	<examples.withText.Component />
</Playground>
