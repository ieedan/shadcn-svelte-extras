---
title: "Image Cropper"
description: "A component for uploading and resizing images."
---

<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from '$lib/components/demo.svelte';
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
	const _docCode0 = "\\<script lang=\"ts\"\\>\n\timport * as ImageCropper from '$lib/components/ui/image-cropper';\n\\<\\/script\\>\n\n<ImageCropper.Root bind:src onUpload>\n\t<ImageCropper.Trigger>\n\t\t<ImageCropper.Preview/>\n\t</ImageCropper.Trigger>\n\t<ImageCropper.Dialog>\n\t\t<ImageCropper.Cropper/>\n\t\t<ImageCropper.Controls>\n\t\t\t<ImageCropper.Crop/>\n\t\t\t<ImageCropper.Cancel/>\n\t\t</ImageCropper.Controls>\n\t</ImageCropper.Dialog>\n</ImageCropper.Root>";
</script>

<Demo demo="image-cropper" />
<Subheading>Installation</Subheading>
<Add item="image-cropper" />
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={_docCode0}
	/>
</div>
<Subheading>Square Preview</Subheading>
<Demo demo="image-cropper-square-preview" />
<Subheading>No Default Image</Subheading>
<Demo demo="image-cropper-no-default-image" />
<Subheading>Custom Trigger</Subheading>
<Demo demo="image-cropper-custom-trigger" />
<Subheading>Custom Preview</Subheading>
<Demo demo="image-cropper-custom-preview" />
<Subheading>Acknowledgements</Subheading>
<p>
	This component was inspired by
	<Link href="https://github.com/sujjeee/shadcn-image-cropper" target="_blank">
		sujjeee/shadcn-image-cropper
	</Link>.
</p>
