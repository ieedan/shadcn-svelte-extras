<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/demo.svelte';
	import { Link } from '$lib/components/ui/link';
	import { examples } from './examples';
</script>

<Subheading class="mt-0">Basic</Subheading>
<Playground code={examples.basic.code} class="min-h-[225px] p-6">
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/pm-command" />
<Subheading>Commands</Subheading>
<p>
	We use
	<Link href="https://github.com/antfu-collective/package-manager-detector" target="_blank">
		package-manager-detector
	</Link> to ensure that every package manager is properly supported. Also giving your auto-complete
	for your commands.
</p>
<Playground code={examples.commands.code} class="min-h-[400px] p-6">
	<examples.commands.Component />
</Playground>
<Subheading>Variants</Subheading>
<Playground code={examples.variants.code} class="min-h-[225px] p-6">
	<examples.variants.Component />
</Playground>
<Subheading>Overflow</Subheading>
<Playground code={examples.overflow.code} class="min-h-[225px] p-6">
	<examples.overflow.Component />
</Playground>
<Subheading>Persisted Package Manager</Subheading>
<p>
	Use the runed <CodeSpan>PersistedState</CodeSpan> API to remember the users package manager.
</p>
<Playground code={examples.persistedPM.code} class="min-h-[225px] p-6">
	<examples.persistedPM.Component />
</Playground>
<Subheading>Customize Agents</Subheading>
<p>
	You can also customize the agents to your liking by providing your own array of agents with the
	<CodeSpan>agents</CodeSpan> prop.
</p>
<Playground code={examples.customizeAgents.code} class="min-h-[225px] p-6">
	<examples.customizeAgents.Component />
</Playground>
