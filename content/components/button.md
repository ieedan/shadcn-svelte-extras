---
title: 'Button'
description: 'An extended button component.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

The same old button you know from shadcn-svelte with a few extra touches.

<Demo demo="button" />

## Installation

<Add item="button" />

## Loading

<Demo demo="button-loading" />

## onClickPromise

You can also pass a promise to `onClickPromise` to show a loading state until it resolves.

<Demo demo="button-on-click-promise" />

<ApiReference />
