<script lang="ts">
	import { Window } from '$lib/components/ui/window';
	import { cn } from '$lib/utils.js';
	import { useTerminalRoot } from './terminal.svelte.js';
	import { onMount } from 'svelte';
	import type { TerminalRootProps } from './types.js';
	import { box } from 'svelte-toolbelt';

	let {
		delay = 0,
		speed = 1,
		onComplete = () => {},
		children,
		class: className
	}: TerminalRootProps = $props();

	const terminal = useTerminalRoot({
		delay: box.with(() => delay),
		speed: box.with(() => speed),
		onComplete: box.with(() => onComplete)
	});

	onMount(() => {
		// we play here so that we don't play before it is visible (on the server)
		terminal.play();

		return () => {
			terminal.dispose();
		};
	});
</script>

<Window class={cn('font-mono text-sm font-light', className)}>
	{@render children?.()}
</Window>
