<script lang="ts">
	import Button, { type ButtonProps } from '$lib/components/button.svelte';
	import { useImageCropperCrop } from './image-cropper.svelte.js';
	import CropIcon from '@lucide/svelte/icons/crop';

	let {
		ref = $bindable(null),
		variant = 'default',
		size = 'sm',
		onclick,
		...rest
	}: ButtonProps = $props();

	const cropState = useImageCropperCrop();
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

		cropState.onclick();
	}}
>
	<CropIcon />
	<span>Crop</span>
</Button>
