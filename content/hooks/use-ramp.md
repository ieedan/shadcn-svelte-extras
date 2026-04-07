---
title: 'UseRamp'
description: 'Repeatedly call a function on an accelerating schedule while a condition holds (hold-to-repeat, ramping counter).'
---

<script lang="ts">
	import Add from '$lib/components/add.svelte';
</script>

## Installation

<Add item="use-ramp" />

## Usage

Use for long-press or hold interactions where the rate of repeats should speed up over time.

```svelte
<script lang="ts">
	import { useRamp } from '$lib/hooks/use-ramp.svelte';

	let count = $state(0);

	const ramp = useRamp({
		increment: () => count++,
		canRamp: () => count < 100
	});
</script>

<button
	onmousedown={ramp.start}
	onmouseup={ramp.reset}
	onmouseleave={ramp.reset}
>
	Hold me ({count})
</button>
```

Call `start()` when the user begins holding, and `reset()` on release or when `canRamp` becomes false inside the ramp loop.
