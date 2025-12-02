<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<p>Allows you to provide a date in natural language and helps by giving suggestions.</p>
<Demo demo="nlp-date-input" />
<Subheading>Installation</Subheading>
<Add item="nlp-date-input" />
<Subheading>Min/Max</Subheading>
<p>
	You may want to limit what suggestions are actually presented to the user so that they don't
	schedule an appointment 30 years from now. You can do this with the
	<CodeSpan>min</CodeSpan> and <CodeSpan>max</CodeSpan> props.
</p>
<Demo demo="nlp-date-input-min-max" />
<Subheading>Locale</Subheading>
<p>
	Additionally, you can specify the locale used for parsing by using the <CodeSpan>locale</CodeSpan> prop.
</p>
<Demo demo="nlp-date-input-locale" />
