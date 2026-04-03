<script lang="ts">
	import DocsSidebar from '$lib/components/docs-sidebar.svelte';
	import PageWrapper from '$lib/components/page-wrapper.svelte';
	import { setupDocs } from '$lib/features/docs/docs-context.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';

	let { children } = $props();

	setupDocs();
</script>

<Sidebar.Provider
	class="3xl:fixed:container 3xl:fixed:px-3 min-h-min flex-1 items-start px-0 [--sidebar-width:220px] [--top-spacing:0] lg:grid lg:grid-cols-[var(--sidebar-width)_minmax(0,1fr)] lg:[--sidebar-width:240px] lg:[--top-spacing:calc(var(--spacing)*4)]"
>
	<DocsSidebar />
	<div class="h-full w-full">
		<PageWrapper>
			{@render children()}
		</PageWrapper>
	</div>
</Sidebar.Provider>
