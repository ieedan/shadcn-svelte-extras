---
title: 'Phone Input'
description: 'A phone number input component.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

## Basic

<Demo demo="phone-input" />

## Installation

<Add item="phone-input" />

## Usage

```svelte
<script lang="ts">
	import { PhoneInput } from '$lib/components/ui/phone-input';
</script>

<PhoneInput placeholder="Enter a phone number" />
```

## Default Country

<Demo demo="phone-input-default-country" />

## Default Value

<Demo demo="phone-input-default-value" />

## Custom Country Ordering

<Demo demo="phone-input-custom-ordering" />

## Acknowledgements

This component takes inspiration from [omeralpi/shadcn-phone-input](https://github.com/omeralpi/shadcn-phone-input).

<ApiReference />
