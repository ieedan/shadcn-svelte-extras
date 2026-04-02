---
title: "Image Cropper"
description: "A component for uploading and resizing images."
---

<script lang="ts">

	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
</script>

<Demo demo="image-cropper" />

## Installation

<Add item="image-cropper" />

## Usage

```svelte
<script lang="ts">
	import * as ImageCropper from '$lib/components/ui/image-cropper';
</script>

<ImageCropper.Root bind:src onUpload>
	<ImageCropper.Trigger>
		<ImageCropper.Preview/>
	</ImageCropper.Trigger>
	<ImageCropper.Dialog>
		<ImageCropper.Cropper/>
		<ImageCropper.Controls>
			<ImageCropper.Crop/>
			<ImageCropper.Cancel/>
		</ImageCropper.Controls>
	</ImageCropper.Dialog>
</ImageCropper.Root>
```

## Square Preview

<Demo demo="image-cropper-square-preview" />

## No Default Image

<Demo demo="image-cropper-no-default-image" />

## Custom Trigger

<Demo demo="image-cropper-custom-trigger" />

## Custom Preview

<Demo demo="image-cropper-custom-preview" />

## Acknowledgements


This component was inspired by
	<Link href="https://github.com/sujjeee/shadcn-image-cropper" target="_blank">
		sujjeee/shadcn-image-cropper
	</Link>.


