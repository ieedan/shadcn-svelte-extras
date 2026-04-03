---
title: 'NLPDateInput'
description: 'A natural language date input with suggestions.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

Allows you to provide a date in natural language and helps by giving suggestions.

<Demo demo="nlp-date-input" />

## Installation

<Add item="nlp-date-input" />

## Min/Max

You may want to limit what suggestions are actually presented to the user so that they don't
schedule an appointment 30 years from now. You can do this with the
`min` and `max` props.

<Demo demo="nlp-date-input-min-max" />

<ApiReference />
