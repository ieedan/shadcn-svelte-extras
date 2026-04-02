---
title: "Code"
description: "A code component."
---

<script lang="ts">
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import shikiRaw from '$lib/components/ui/code/shiki.ts?raw';
</script>

<Demo demo="code" />

## Installation

<Add item="code" />

## Configuring Languages

The highlighter and languages can be configured from `shiki.ts`.

<Code
	lang="typescript"
	code={shikiRaw}
	class="h-fit"
	highlight={[
		[5, 12],
		[18, 25]
	]}
/>

## Copy Button

<Demo demo="code-copy-button" />

## No Line Numbers

<Demo demo="code-no-line-numbers" />

## Variants

<Demo demo="code-variants" />

## Highlight Lines

<Demo demo="code-highlight-lines" />

## Overflow

<Demo demo="code-overflow" />

## Code Block

<Demo demo="code-block" />
