<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import Code from '$lib/components/docs/code.svelte';
</script>

<Demo demo="stepper" />
<Subheading>Installation</Subheading>
<Add item="stepper" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import * as Stepper from '$lib/components/ui/stepper';
\<\/script\>

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
`}
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
