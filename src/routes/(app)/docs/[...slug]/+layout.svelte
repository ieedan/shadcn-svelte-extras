<script lang="ts">
	import PageWrapper from '$lib/components/page-wrapper.svelte';
	import { setupDocs } from '$lib/features/docs/docs-context.svelte';

	let { children } = $props();

	setupDocs();
</script>

<PageWrapper>
	{@render children()}
</PageWrapper>
