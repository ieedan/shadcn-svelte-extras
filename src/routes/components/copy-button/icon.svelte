<script lang="ts">
	import { CopyButton } from '$lib/components/ui/copy-button';
	import { ClipboardIcon } from '@lucide/svelte';
</script>

<CopyButton text="Hello, World!">
	{#snippet icon()}
		<ClipboardIcon />
	{/snippet}
</CopyButton>
