<!--
<script lang="ts">
	// make sure to include the ModeWatcher component in the root +layout.svelte file
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
</script>

<ModeWatcher/>
{@render children?.()}
-->

<script lang="ts">
	import { LightSwitch } from '$lib/components/ui/light-switch';
</script>

<LightSwitch />
