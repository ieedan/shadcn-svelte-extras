<script lang="ts">
	import { PMCommand } from '$lib/components/ui/pm-command';
</script>

<PMCommand
	command="execute"
	args={[
		'jsrepo',
		'build',
		'--preview',
		'--include-blocks',
		'pm-command',
		'button',
		'copy-button',
		'use-clipboard',
		'utils'
	]}
/>
