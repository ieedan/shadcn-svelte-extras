<script lang="ts">
	import { isMac } from '$lib/hooks/is-mac.svelte';
	import Mac from './mac.svelte';
	import NotMac from './not-mac.svelte';
</script>

{#if isMac}
	<Mac />
{:else}
	<NotMac />
{/if}
