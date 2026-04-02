---
title: 'Password'
description: 'Components for handling passwords and other secrets.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="password" />

## Installation

<Add item="password" />

## Usage

```svelte
<script lang="ts">
	import * as Password from '$lib/components/ui/password';
</script>

<Password.Root>
	<Password.Input>
		<Password.Copy />
		<Password.ToggleVisibility />
	</Password.Input>
	<Password.Strength />
</Password.Root>
```

## Toggle Visibility

Add a button to toggle the visibility of the password.

<Demo demo="password-toggle-visibility" />

## Copy

Add a button to copy the secret to the clipboard.

<Demo demo="password-copy" />

## Both

You can also add both a visibility toggle and a copy button and they will play nicely.

<Demo demo="password-both" />

## Strength

Add a strength meter to the password input using [zxcvbn-ts](https://zxcvbn-ts.github.io/zxcvbn/)

When a password is too weak (as determined by the `minScore` prop) the input is marked as invalid and users will be unable to submit the form.

<Demo demo="password-strength" />

<ApiReference />
