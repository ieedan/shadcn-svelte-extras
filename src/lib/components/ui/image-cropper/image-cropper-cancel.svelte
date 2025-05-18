<script lang="ts">
	import { type ButtonProps, Button } from '$lib/components/ui/button';
	import type { WithoutChildren } from 'bits-ui';
	import { useImageCropperCancel } from './image-cropper.svelte.js';
	import { Trash2Icon } from '@lucide/svelte';

	let {
		variant = 'outline',
		size = 'sm',
		...rest
	}: Omit<WithoutChildren<ButtonProps>, 'onclick'> = $props();

	const cancelState = useImageCropperCancel();
</script>

<Button {...rest} {size} {variant} onclick={cancelState.onclick}>
	<Trash2Icon />
	<span>Cancel</span>
</Button>
