<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { examples } from './examples';
</script>

<p>The same old button you know from shadcn-svelte with a few extra touches.</p>
<Subheading class="mt-0">Basic</Subheading>
<Playground code={examples.basic.code} class="min-h-[225px]">
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/button" />
<Subheading>Loading</Subheading>
<Playground code={examples.loading.code} class="min-h-[225px]">
	<examples.loading.Component />
</Playground>
<Subheading>onClickPromise</Subheading>
<p>
	You can also pass a promise to <CodeSpan>onClickPromise</CodeSpan> to show a loading state until it
	resolves.
</p>
<Playground code={examples.onClickPromise.code} class="min-h-[225px]">
	<examples.onClickPromise.Component />
</Playground>
