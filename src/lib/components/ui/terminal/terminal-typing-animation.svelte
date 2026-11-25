<script lang="ts">
	import { cn } from '#lib/utils.ts';
	import { onDestroy } from 'svelte';
	import { useAnimation } from './terminal.svelte.ts';
	import type { TerminalAnimationProps } from './types.ts';
	import { typewriter } from '#lib/actions/typewriter.svelte.ts';
	import { box } from 'svelte-toolbelt';

	let { children, delay = 0, class: className }: TerminalAnimationProps = $props();

	let playAnimation = $state(false);
	let animationSpeed = $state(1);

	const play = (speed: number) => {
		playAnimation = true;
		animationSpeed = speed;
	};

	const animation = useAnimation({ delay: box.with(() => delay), play });

	onDestroy(() => animation.dispose());
</script>

{#if playAnimation}
	<span
		class={cn('block', className)}
		transition:typewriter={{
			speed: animationSpeed * 2,
			onComplete: () => animation.onComplete?.()
		}}
	>
		{@render children?.()}
	</span>
{/if}
