<script lang="ts">
	import { CopyButton } from '$lib/components/ui/copy-button';
	import { TerminalIcon } from '@lucide/svelte';

	const command = 'jsrepo add ui/copy-button';
</script>

<CopyButton text={command} size="sm" variant="outline">
	{#snippet icon()}
		<TerminalIcon />
	{/snippet}
	<span class="font-mono text-sm">{command}</span>
</CopyButton>
