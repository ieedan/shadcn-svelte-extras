<script lang="ts">
	import { PMCommand } from '$lib/components/ui/pm-command';
	import { Subheading } from '$lib/components/docs';
	import { PersistedState } from 'runed';
	import type { Agent } from 'package-manager-detector';

	type Props = {
		specifier: `${string}/${string}`;
	};

	let { specifier }: Props = $props();

	const agent = new PersistedState<Agent>('user-package-manager', 'npm');
</script>

<Subheading>Installation</Subheading>
<PMCommand command="execute" args={['jsrepo', 'add', specifier]} bind:agent={agent.current} />
