<script lang="ts">
	import { CodeSpan, Subheading } from '$lib/components/docs';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
</script>

<Demo demo="pm-command" />
<Subheading>Installation</Subheading>
<Add item="pm-command" />
<Subheading>Commands</Subheading>
<p>
	We use
	<Link href="https://github.com/antfu-collective/package-manager-detector" target="_blank">
		package-manager-detector
	</Link> to ensure that every package manager is properly supported. Also giving your auto-complete
	for your commands.
</p>
<Demo demo="pm-command-commands" />
<Subheading>Variants</Subheading>
<Demo demo="pm-command-variants" />
<Subheading>Overflow</Subheading>
<Demo demo="pm-command-overflow" />
<Subheading>Persisted Package Manager</Subheading>
<p>
	Use the runed <CodeSpan>PersistedState</CodeSpan> API to remember the users package manager.
</p>
<Demo demo="pm-command-persisted-pm" />
<Subheading>Customize Agents</Subheading>
<p>
	You can also customize the agents to your liking by providing your own array of agents with the
	<CodeSpan>agents</CodeSpan> prop.
</p>
<Demo demo="pm-command-customize-agents" />
