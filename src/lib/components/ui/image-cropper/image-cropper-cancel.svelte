<script lang="ts">
	import Button, { type ButtonProps } from '$lib/components/button.svelte';
	import { useImageCropperCancel } from './image-cropper.svelte.js';
	import Trash2Icon from '@lucide/svelte/icons/trash-2';

	let {
		ref = $bindable(null),
		variant = 'outline',
		size = 'sm',
		onclick,
		...rest
	}: ButtonProps = $props();

	const cancelState = useImageCropperCancel();
</script>

<Button
	{...rest as /* eslint-disable-line @typescript-eslint/no-explicit-any */ any}
	bind:ref
	{size}
	{variant}
	onclick={(
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) => {
		onclick?.(e);

		cancelState.onclick();
	}}
>
	<Trash2Icon />
	<span>Cancel</span>
</Button>
