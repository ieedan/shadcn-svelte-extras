<script lang="ts" module>
	export const schema = v.object({
		attachments: v.array(v.pipe(v.file(), v.maxSize(FileDropZone.MEGABYTE * 2)))
	});

	type Schema = v.InferInput<typeof schema>;
</script>

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as FileDropZone from '$lib/components/ui/file-drop-zone';
	import XIcon from '@lucide/svelte/icons/x';
	import { toast } from 'svelte-sonner';
	import { type SuperValidated, superForm, filesProxy } from 'sveltekit-superforms';
	import SuperDebug from 'sveltekit-superforms';
	import { valibotClient } from 'sveltekit-superforms/adapters';
	import * as v from 'valibot';

	// Create a mock form data structure for demo purposes
	// In a real app, this would come from +page.server.ts
	const mockFormData: SuperValidated<Schema> = {
		valid: false,
		posted: false,
		errors: {},
		data: { attachments: [] },
		message: undefined,
		id: 'form',
		allErrors: [],
		constraints: {}
	} as SuperValidated<Schema>;

	const form = superForm(mockFormData, {
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

	const onUpload: FileDropZone.FileDropZoneRootProps['onUpload'] = async (uploadedFiles) => {
		// we use set instead of an assignment since it accepts a File[]
		files.set([...Array.from($files), ...uploadedFiles]);
	};

	const onFileRejected: FileDropZone.FileDropZoneRootProps['onFileRejected'] = async ({
		reason,
		file
	}) => {
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
	<FileDropZone.Root
		{onUpload}
		{onFileRejected}
		maxFileSize={3 * FileDropZone.MEGABYTE}
		accept="image/*"
		maxFiles={4}
		fileCount={$files.length}
	>
		<FileDropZone.Trigger />
	</FileDropZone.Root>
	<div class="flex flex-col gap-2">
		{#each Array.from($files) as file, i (file.name)}
			<div class="flex place-items-center justify-between gap-2">
				<div class="flex flex-col">
					<span>{file.name}</span>
					<span class="text-muted-foreground text-xs">{FileDropZone.displaySize(file.size)}</span>
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
