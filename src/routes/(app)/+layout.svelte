<script lang="ts">
	import { commandContext } from '$lib/context';
	import { shortcut } from '$lib/actions/shortcut.svelte';
	import { Command } from '$lib/components/docs/command';
	import { UseBoolean } from '$lib/hooks/use-boolean.svelte';
	import SiteHeader from '$lib/components/site-header.svelte';

	let { children } = $props();

	const commandState = commandContext.set(new UseBoolean(false));
</script>

<svelte:window
	use:shortcut={{
		ctrl: true,
		key: 'k',
		callback: commandState.setTrue
	}}
/>

<Command />

<SiteHeader />
<div class="flex flex-col items-center">
	<div class="site-container">
		{@render children()}
	</div>
</div>
