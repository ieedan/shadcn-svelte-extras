<script lang="ts">
	import * as ImageCropper from '$lib/components/ui/image-cropper';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { EditIcon } from '@lucide/svelte';

	let src = $state('https://github.com/shadcn.png');
</script>

<ImageCropper.Root bind:src>
	<div class="relative">
		<ImageCropper.Preview />
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						class="absolute -bottom-3 -left-3 rounded-full"
						variant="outline"
						size="icon"
					>
						<EditIcon class="size-4" />
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="start">
				<ImageCropper.UploadTrigger>
					<DropdownMenu.Item>Upload a photo...</DropdownMenu.Item>
				</ImageCropper.UploadTrigger>
				<DropdownMenu.Item onclick={() => (src = '')}>Remove photo</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<ImageCropper.Dialog>
		<ImageCropper.Cropper />
		<ImageCropper.Controls>
			<ImageCropper.Cancel />
			<ImageCropper.Crop />
		</ImageCropper.Controls>
	</ImageCropper.Dialog>
</ImageCropper.Root>
