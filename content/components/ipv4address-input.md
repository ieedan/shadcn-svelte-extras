---
title: 'IPv4Address Input'
description: "An IPv4 address input with all the behavior you'd expect."
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

## Basic

<Demo demo="ipv4address-input" />

## Installation

<Add item="ipv4address-input" />

## Usage

```svelte
<script lang="ts">
	import { IPv4AddressInput } from '$lib/components/ui/ipv4address-input';
</script>

<IPv4AddressInput />
```

## Placeholder

<Demo demo="ipv4address-input-placeholder" />

## Reactive

<Demo demo="ipv4address-input-reactive" />

## Validation

<Demo demo="ipv4address-input-valid" />

<ApiReference />
