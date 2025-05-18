<script lang="ts">
	import { type ButtonProps, Button } from '$lib/components/ui/button';
	import type { WithoutChildren } from 'bits-ui';
	import { useImageCropperCrop } from './image-cropper.svelte.js';
	import { CropIcon } from '@lucide/svelte';

	let {
		variant = 'default',
		size = 'sm',
		...rest
	}: Omit<WithoutChildren<ButtonProps>, 'onclick'> = $props();

	const cropState = useImageCropperCrop();
</script>

<Button {...rest} {size} {variant} onclick={cropState.onclick}>
	<CropIcon />
	<span>Crop</span>
</Button>
