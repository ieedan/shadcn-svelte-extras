<script lang="ts">
	import { Subheading } from '$lib/components/docs';
	import Installation from '$lib/components/installation.svelte';
	import Playground from '$lib/components/playground.svelte';
	import Code from '$lib/components/docs/code.svelte';
	import { Link } from '$lib/components/ui/link';
	import { examples } from './examples';
	import { ImageCropperReference } from '$lib/docs/api-reference/components';
	import ApiReference from '$lib/docs/api-reference/api-reference.svelte';
</script>

<Playground code={examples.basic.code}>
	<examples.basic.Component />
</Playground>
<Installation specifier="ui/image-cropper" />
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
<Playground code={examples.squarePreview.code}>
	<examples.squarePreview.Component />
</Playground>
<Subheading>No Default Image</Subheading>
<Playground code={examples.noDefaultImage.code}>
	<examples.noDefaultImage.Component />
</Playground>
<Subheading>Custom Trigger</Subheading>
<Playground code={examples.customTrigger.code}>
	<examples.customTrigger.Component />
</Playground>
<Subheading>Custom Preview</Subheading>
<Playground code={examples.customPreview.code}>
	<examples.customPreview.Component />
</Playground>
<Subheading>API Reference</Subheading>
<ApiReference name="ImageCropper" components={ImageCropperReference} />
<Subheading>Acknowledgements</Subheading>
<p>
	This component was inspired by
	<Link href="https://github.com/sujjeee/shadcn-image-cropper" target="_blank">
		sujjeee/shadcn-image-cropper
	</Link>.
</p>
