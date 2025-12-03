<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="number-field" />
<Subheading>Installation</Subheading>
<Add item="number-field" />
<Subheading>Step</Subheading>
<p>
	Use the <CodeSpan>step</CodeSpan> prop to increment or decrement the value by a specific amount,
	in this case 100.
</p>
<Demo demo="number-field-step" />

