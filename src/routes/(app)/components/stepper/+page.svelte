<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
</script>

<Demo demo="stepper" />
<Subheading>Installation</Subheading>
<Add item="stepper" />
<Subheading>Icons</Subheading>
<p>
	Add an icon to the <CodeSpan>Trigger</CodeSpan> component to display an icon.
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
