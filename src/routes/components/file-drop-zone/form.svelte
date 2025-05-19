<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		displaySize,
		FileDropZone,
		MEGABYTE,
		type FileDropZoneProps
	} from '$lib/components/ui/file-drop-zone';
	import { XIcon } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, superForm, filesProxy } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import { schema, type Schema } from './schema';

	let { data }: { data: { form: SuperValidated<Schema> } } = $props();

	const form = superForm(data.form, {
		validators: valibotClient(schema)
	});

	const { form: formData, enhance, message } = form;

	message.subscribe((message) => {
		if (message) {
			toast.success(message.text, {
				description: 'Your attachments were uploaded.'
			});
		}
	});

	const onUpload: FileDropZoneProps['onUpload'] = async (uploadedFiles) => {
		// we use set instead of an assignment since it accepts a File[]
		files.set([...Array.from($files), ...uploadedFiles]);
	};

	const onFileRejected: FileDropZoneProps['onFileRejected'] = async ({ reason, file }) => {
		toast.error(`${file.name} failed to upload!`, { description: reason });
	};

	const files = filesProxy(form, 'attachments');
</script>

<form
	method="POST"
	enctype="multipart/form-data"
	use:enhance
	class="flex w-full flex-col gap-2 p-6"
>
	<FileDropZone
		{onUpload}
		{onFileRejected}
		maxFileSize={2 * MEGABYTE}
		accept="image/*"
		maxFiles={4}
		fileCount={$files.length}
	/>
	<input name="attachments" type="file" bind:files={$files} class="hidden" />
	<div class="flex flex-col gap-2">
		{#each Array.from($files) as file, i (file.name)}
			<div class="flex place-items-center justify-between gap-2">
				<div class="flex flex-col">
					<span>{file.name}</span>
					<span class="text-muted-foreground text-xs">{displaySize(file.size)}</span>
				</div>
				<Button
					variant="outline"
					size="icon"
					onclick={() => {
						// we use set instead of an assignment since it accepts a File[]
						files.set([...Array.from($files).slice(0, i), ...Array.from($files).slice(i + 1)]);
					}}
				>
					<XIcon />
				</Button>
			</div>
		{/each}
	</div>
	<Button type="submit" class="w-fit">Submit</Button>
	<SuperDebug data={$formData} />
</form>
