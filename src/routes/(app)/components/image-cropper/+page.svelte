<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Code from '$lib/components/docs/code.svelte';
	import Demo from "$lib/components/demo.svelte";
	import Add from '$lib/components/add.svelte';
	import { Link } from '$lib/components/ui/link';
</script>

<Demo demo="image-cropper"/>
<Subheading>Installation</Subheading>
<Add item="image-cropper"/>
<Subheading>Usage</Subheading>
<div>
	<Code
		lang="svelte"
		code={`\<script lang="ts"\>
	import * as ImageCropper from '$lib/components/ui/image-cropper';
\<\/script\>

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
</ImageCropper.Root>`}
	/>
</div>
<Subheading>Square Preview</Subheading>
<Demo demo="image-cropper-square-preview"/>
<Subheading>No Default Image</Subheading>
<Demo demo="image-cropper-no-default-image"/>
<Subheading>Custom Trigger</Subheading>
<Demo demo="image-cropper-custom-trigger"/>
<Subheading>Custom Preview</Subheading>
<Demo demo="image-cropper-custom-preview"/>
<Subheading>Acknowledgements</Subheading>
<p>
	This component was inspired by
	<Link href="https://github.com/sujjeee/shadcn-image-cropper" target="_blank">
		sujjeee/shadcn-image-cropper
	</Link>.
</p>
