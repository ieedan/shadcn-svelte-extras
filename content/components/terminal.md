---
title: 'Terminal'
description: 'An implementation of the MacOS terminal. Useful for showcasing a command line interface.'
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Demo demo="terminal" />

## Installation

<Add item="terminal" />

## Usage

```svelte
<script lang="ts">
	import * as Terminal from '$lib/components/ui/terminal';
</script>

<Terminal.Root>
	<Terminal.TypingAnimation />
	<Terminal.AnimatedSpan />
</Terminal.Root>
```

You can add a delay to `<Terminal.Root/>` to delay every animation by that amount of time:

```svelte {5}
<script lang="ts">
	import * as Terminal from '$lib/components/ui/terminal';
</script>

<Terminal.Root delay={250}>
	<Terminal.TypingAnimation />
	<Terminal.AnimatedSpan />
</Terminal.Root>
```

You can also change the speed of all animations from `<Terminal.Root/>`:

```svelte {5,6}
<script lang="ts">
	import * as Terminal from '$lib/components/ui/terminal';
</script>

<!-- half speed -->
<Terminal.Root speed={0.5}>
	<Terminal.TypingAnimation />
	<Terminal.AnimatedSpan />
</Terminal.Root>
```

## Loop

You can make the terminal preview continuously loop using the `<Terminal.Loop/>` component.

<Demo demo="terminal-loop" />

## Acknowledgements

This component was inspired by [magicuidesign/magicui](https://magicui.design/docs/components/terminal).

<ApiReference />
