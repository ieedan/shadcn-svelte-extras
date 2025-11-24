<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { onDestroy } from 'svelte';
	import { useAnimation } from './terminal.svelte.js';
	import { fly } from 'svelte/transition';
	import type { TerminalLoadingProps } from './types';

	const frames = ['◒', '◐', '◓', '◑'];

	let {
		delay = 0,
		loadingMessage,
		completeMessage,
		duration = 1000,
		class: className
	}: TerminalLoadingProps = $props();

	let playAnimation = $state(false);
	let animationSpeed = $state(1);
	let frameIndex = $state(0);
	let complete = $state(false);
	let interval = $state<ReturnType<typeof setInterval>>();
	let timeout = $state<ReturnType<typeof setTimeout>>();

	const play = (speed: number) => {
		playAnimation = true;
		animationSpeed = speed;

		interval = setInterval(nextFrame, 75 / animationSpeed);
		timeout = setTimeout(() => {
			complete = true;
			animation.onComplete?.();
		}, duration / animationSpeed);
	};

	const nextFrame = () => {
		if (frameIndex >= frames.length - 1) {
			frameIndex = 0;
			return;
		}

		frameIndex++;
	};

	const flyDuration = $derived(300 / animationSpeed);

	const animation = useAnimation({ delay, play });

	onDestroy(() => {
		animation.dispose();
		clearInterval(interval);
		clearTimeout(timeout);
	});
</script>

{#if playAnimation && !complete}
	<span class={cn('block', className)} in:fly={{ y: -5, duration: flyDuration }}>
		<span class="text-cyan-400">{frames[frameIndex]}</span>
		{@render loadingMessage()}
	</span>
{:else if playAnimation}
	<span class={cn('block', className)} data-completed in:fly={{ y: -5, duration: flyDuration }}>
		{@render completeMessage()}
	</span>
{/if}
