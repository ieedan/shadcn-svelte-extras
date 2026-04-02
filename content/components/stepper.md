---
title: "Stepper"
description: "A keyboard accessible stepper component."
---

<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import Code from '$lib/components/docs/code.svelte';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n\timport * as Stepper from '$lib/components/ui/stepper';\n\\<\\/script\\>\n\n<Stepper.Root>\n\t<Stepper.Nav>\n\t\t<Stepper.Item>\n\t\t\t<Stepper.Trigger>\n\t\t\t\t<Stepper.Indicator>1</Stepper.Indicator>\n\t\t\t\t<Stepper.Title>Step 1</Stepper.Title>\n\t\t\t\t<Stepper.Description>Description of step 1</Stepper.Description>\n\t\t\t</Stepper.Trigger>\n\t\t</Stepper.Item>\n\t</Stepper.Nav>\n</Stepper.Root>\n";
</script>

<Demo demo="stepper" />
<Subheading>Installation</Subheading>
<Add item="stepper" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={_docCode0}
	/>
</div>
<Subheading>Icons</Subheading>
<p>
	Add an icon to the <CodeSpan>Indicator</CodeSpan> component to display an icon.
</p>
<Demo demo="stepper-icon" />
<Subheading>Vertical</Subheading>
<p>
	Add <CodeSpan>orientation="vertical"</CodeSpan> to the <CodeSpan>Nav</CodeSpan> component to make the
	stepper vertical.
</p>
<Demo demo="stepper-vertical" />
<Subheading>Form</Subheading>
<p>
	Create a multi-step form with the <CodeSpan>Stepper</CodeSpan> component.
</p>
<Demo demo="stepper-form" class="min-h-[600px]" />
