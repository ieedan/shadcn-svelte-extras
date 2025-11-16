<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();
</script>

{#key page.params.path}
	{@render children()}
{/key}
