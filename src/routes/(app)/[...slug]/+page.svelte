<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const Markdown = $derived(data.component);
</script>

<Markdown />
