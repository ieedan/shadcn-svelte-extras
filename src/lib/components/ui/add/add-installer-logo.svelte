<script lang="ts">
	import JsrepoLogo from '#lib/components/logos/jsrepo.svelte';
	import ShadcnSvelteLogo from '#lib/components/logos/shadcn-svelte.svelte';
	import type { Installer } from '#lib/components/ui/add/add.svelte.js';
	import { cn } from '#lib/utils.ts';

	let { installer, class: className }: { installer: Installer; class?: string } = $props();
</script>

{#if installer === 'jsrepo'}
	<JsrepoLogo class={cn('size-4 shrink-0', className)} />
{:else}
	<ShadcnSvelteLogo class={className} />
{/if}
