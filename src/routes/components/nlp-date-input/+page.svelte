<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import { examples } from './examples';
</script>

<p>Allows you to provide a date in natural language and helps by giving suggestions.</p>
<Playground code={examples.basic.code} class="min-h-[400px] p-6">
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/nlp-date-input" />
<Subheading>Min/Max</Subheading>
<p>
	You may want to limit what suggestions are actually presented to the user so that they don't
	schedule an appointment 30 years from now. You can do this with the
	<CodeSpan>min</CodeSpan> and <CodeSpan>max</CodeSpan> props.
</p>
<Playground code={examples.minMax.code} class="min-h-[400px] p-6">
	<examples.minMax.Component />
</Playground>
