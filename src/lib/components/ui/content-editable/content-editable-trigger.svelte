<script lang="ts">
	import Button, { type ButtonElementProps } from '../button/button.svelte';
	import { useContentEditableTrigger } from './content-editable.svelte.js';

	type Props = ButtonElementProps;

	let { variant = 'secondary', size = 'sm', onclick, children, ...rest }: Props = $props();

	const state = useContentEditableTrigger();
</script>

<Button
	onclick={(e: Parameters<NonNullable<Props['onclick']>>[0]) => {
		onclick?.(e);
		state.root.startEdit();
	}}
	{size}
	{variant}
	{...rest}
>
	{@render children?.()}
</Button>
