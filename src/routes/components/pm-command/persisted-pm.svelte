<script lang="ts">
	import { PMCommand } from '$lib/components/ui/pm-command';
	import { PersistedState } from 'runed';
	import type { Agent } from 'package-manager-detector';

	const agent = new PersistedState<Agent>('user-package-manager', 'npm');
</script>

<PMCommand command="execute" args={['jsrepo', 'add', 'ui/pm-command']} bind:agent={agent.current} />
