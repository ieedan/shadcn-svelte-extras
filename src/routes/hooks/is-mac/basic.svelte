<script lang="ts">
	import { IsMac } from '$lib/hooks/is-mac.svelte';
	import Mac from './mac.svelte';
	import NotMac from './not-mac.svelte';

	const isMac = new IsMac();
</script>

{#if isMac.current}
	<Mac />
{:else}
	<NotMac />
{/if}
