<script lang="ts" module>
	import type { WithoutChildren } from 'bits-ui';

	export type SplitButtonActionProps = WithoutChildren<ButtonProps> & {
		value: string;
		children?: import('svelte').Snippet;
	};
</script>

<script lang="ts">
	import Button, { type ButtonProps } from '$lib/components/button.svelte';
	import { useSplitButtonAction } from './split-button.svelte.js';
	import { box } from 'svelte-toolbelt';

	let {
		ref = $bindable(null),
		value,
		onclick,
		children,
		...rest
	}: SplitButtonActionProps = $props();

	const state = useSplitButtonAction({
		value: box.with(() => value),
		onclick: box.with(() => onclick)
	});
</script>

{#if state.isActive}
	<Button bind:ref onclick={(e) => state.onclick(e)} {...rest}>
		{@render children?.()}
	</Button>
{/if}
