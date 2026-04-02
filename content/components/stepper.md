---
title: "Stepper"
description: "A keyboard accessible stepper component."
---

<script lang="ts">
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="stepper" />

## Installation

<Add item="stepper" />

## Usage

```svelte
<script lang="ts">
	import * as Stepper from '$lib/components/ui/stepper';
</script>

<Stepper.Root>
	<Stepper.Nav>
		<Stepper.Item>
			<Stepper.Trigger>
				<Stepper.Indicator>1</Stepper.Indicator>
				<Stepper.Title>Step 1</Stepper.Title>
				<Stepper.Description>Description of step 1</Stepper.Description>
			</Stepper.Trigger>
		</Stepper.Item>
	</Stepper.Nav>
</Stepper.Root>

```

## Icons


Add an icon to the `Indicator` component to display an icon.


<Demo demo="stepper-icon" />

## Vertical


Add `orientation="vertical"` to the `Nav` component to make the
	stepper vertical.


<Demo demo="stepper-vertical" />

## Form


Create a multi-step form with the `Stepper` component.


<Demo demo="stepper-form" class="min-h-[600px]" />
