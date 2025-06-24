<script lang="ts">
	import Button, { type ButtonElementProps } from '../button/button.svelte';
	import { useContentEditableCancel } from './content-editable.svelte.js';

	type Props = ButtonElementProps;

	let { variant = 'outline', size = 'sm', onclick, children, ...rest }: Props = $props();

	const state = useContentEditableCancel();
</script>

<Button
	onclick={(e: Parameters<NonNullable<Props['onclick']>>[0]) => {
		onclick?.(e);
		state.root.endEdit({ commit: false });
	}}
	{size}
	{variant}
	{...rest}
>
	{@render children?.()}
</Button>
