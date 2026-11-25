<script lang="ts">
	import { useImageCropperTrigger } from './image-cropper.svelte.ts';
	import type { ImageCropperUploadTriggerProps } from './types.ts';

	let { ref = $bindable(null), children, ...rest }: ImageCropperUploadTriggerProps = $props();

	const triggerState = useImageCropperTrigger();
</script>

<label {...rest} bind:this={ref} for={triggerState.rootState.id} class="hover:cursor-pointer">
	{@render children?.()}
</label>
