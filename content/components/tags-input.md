---
title: "Tags Input"
description: "A tags input component."
---

<script lang="ts">
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import customValidateRaw from '$lib/docs/tags-input-custom-validate.ts?raw';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="tags-input" />

## Installation

<Add item="tags-input" />

## Usage

```svelte
<script lang="ts">
	import { TagsInput } from "$lib/components/ui/tags-input";
</script>

<TagsInput/>
```

## Custom Validation


For most of the validation and transformation you will need to do you can use the
	`validate` property.


For example let's say you want to make all of the tags lowercase.


Write a custom validate function:


<div>
	<Code lang="typescript" code={customValidateRaw} />
</div>


Pass the function to the `<TagsInput/>` component:


<Demo demo="tags-input-lowercase" />

## Autocomplete


Provide a list of `suggestions` to show an autocomplete dropdown as the user types.


<Demo demo="tags-input-autocomplete" />

## Restricted to Suggestions


Set `restrictToSuggestions` to only allow values from the suggestions list.


<Demo demo="tags-input-autocomplete-restricted" />

<ApiReference />
