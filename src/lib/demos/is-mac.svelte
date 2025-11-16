<script lang="ts">
	import { isMac } from '$lib/hooks/is-mac.svelte';
	import * as Icons from '$lib/components/icons';
</script>

{#if isMac}
	<div class="flex h-[264px] w-60 items-center justify-center">
		<Icons.Apple class="size-10 rounded-lg" />
	</div>
{:else}
	<div class="flex flex-col items-center justify-center gap-2">
		<img src="/docs/microsoft.jpeg" alt="Windows" class="size-60 rounded-lg" />
		<span class="text-muted-foreground text-xs">(sorry Linux users)</span>
	</div>
{/if}

