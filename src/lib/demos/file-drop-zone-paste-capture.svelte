<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import * as FileDropZone from '$lib/components/ui/file-drop-zone';
	import { Kbd, KbdGroup } from '$lib/components/ui/kbd';
	import { cmdOrCtrl } from '$lib/hooks/is-mac.svelte';
	import ClipboardIcon from '@lucide/svelte/icons/clipboard';
	import XIcon from '@lucide/svelte/icons/x';
	import { toast } from 'svelte-sonner';

	type UploadedFile = {
		name: string;
		size: number;
		url: string;
	};

	let files = $state<UploadedFile[]>([]);

	const onUpload: FileDropZone.FileDropZoneRootProps['onUpload'] = async (uploadedFiles) => {
		for (const file of uploadedFiles) {
			files.push({
				name: file.name,
				size: file.size,
				url: URL.createObjectURL(file)
			});
		}
	};

	const onFileRejected: FileDropZone.FileDropZoneRootProps['onFileRejected'] = ({
		reason,
		file
	}) => {
		toast.error(`${file.name} failed to upload!`, { description: reason });
	};

	const removeFile = (index: number) => {
		URL.revokeObjectURL(files[index].url);
		files = [...files.slice(0, index), ...files.slice(index + 1)];
	};
</script>

<div class="flex w-full flex-col gap-2 p-6">
	<FileDropZone.Root
		{onUpload}
		{onFileRejected}
		maxFileSize={3 * FileDropZone.MEGABYTE}
		accept="image/*"
		maxFiles={4}
		fileCount={files.length}
		capturePaste
	>
		<FileDropZone.Trigger>
			<div
				class="hover:bg-accent/25 flex h-48 flex-col place-items-center justify-center gap-2 rounded-lg border border-dashed p-6 transition-all hover:cursor-pointer"
			>
				<div
					class="border-border text-muted-foreground flex size-14 place-items-center justify-center rounded-full border border-dashed"
				>
					<ClipboardIcon class="size-7" />
				</div>
				<span class="text-muted-foreground flex place-items-center gap-1.5 font-medium">
					Copy an image, then press
					<KbdGroup>
						<Kbd>{cmdOrCtrl}</Kbd>
						<Kbd>V</Kbd>
					</KbdGroup>
					anywhere on the page
				</span>
			</div>
		</FileDropZone.Trigger>
	</FileDropZone.Root>
	<div class="flex flex-col gap-2">
		{#each files as file, i (file.name)}
			<div
				class="border-border flex place-items-center justify-between gap-2 rounded-md border p-2"
			>
				<div class="flex place-items-center gap-2">
					<div class="relative size-9 overflow-clip">
						<img
							src={file.url}
							alt={file.name}
							class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-clip"
						/>
					</div>
					<div class="flex flex-col">
						<span class="text-nowrap">{file.name}</span>
						<span class="text-muted-foreground text-xs">{FileDropZone.displaySize(file.size)}</span>
					</div>
				</div>
				<Button variant="outline" size="icon" onclick={() => removeFile(i)}>
					<XIcon />
				</Button>
			</div>
		{/each}
	</div>
</div>
