<script lang="ts">
	import { commandContext } from '#lib/context.ts';
	import { shortcut } from '#lib/actions/shortcut.svelte.ts';
	import { Command } from '#lib/components/docs/command/index.ts';
	import { UseBoolean } from '#lib/hooks/use-boolean.svelte.ts';
	import SiteHeader from '#lib/components/site-header.svelte';

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
