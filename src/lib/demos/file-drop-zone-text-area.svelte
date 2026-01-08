<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as FileDropZone from '$lib/components/ui/file-drop-zone';
	import * as Select from '$lib/components/ui/select';
	import ImageIcon from '@lucide/svelte/icons/image';
	import SendIcon from '@lucide/svelte/icons/send-horizontal';
	import XIcon from '@lucide/svelte/icons/x';
	import { cn } from '$lib/utils';
	import { slide } from 'svelte/transition';

	const models = [
		{ value: 'claude-opus-4', label: 'Claude Opus 4' },
		{ value: 'claude-sonnet-4', label: 'Claude Sonnet 4' },
		{ value: 'gpt-4o', label: 'GPT-4o' },
		{ value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
		{ value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' }
	];

	type UploadedFile = {
		name: string;
		type: string;
		size: number;
		url: string;
	};

	let files = $state<UploadedFile[]>([]);
	let prompt = $state('');
	let selectedModel = $state<string>('claude-opus-4');

	const onUpload: FileDropZone.FileDropZoneRootProps['onUpload'] = async (newFiles) => {
		for (const file of newFiles) {
			// don't upload duplicate files
			if (files.find((f) => f.name === file.name)) continue;

			files.push({
				name: file.name,
				type: file.type,
				size: file.size,
				url: URL.createObjectURL(file)
			});
		}
	};

	const removeFile = (index: number) => {
		const file = files[index];
		URL.revokeObjectURL(file.url);
		files = [...files.slice(0, index), ...files.slice(index + 1)];
	};
</script>

<div class="flex w-full flex-col gap-4 p-6">
	<FileDropZone.Root {onUpload} accept="image/*" maxFiles={4} fileCount={files.length}>
		<div class="bg-card border-border flex flex-col gap-3 rounded-xl border p-3">
			{#if files.length > 0}
				<div transition:slide={{ duration: 200 }} class="flex flex-wrap gap-2 px-1">
					{#each files as file, i (file.name)}
						<div class="group relative">
							<div class="border-border bg-secondary size-16 overflow-hidden rounded-lg border">
								<img src={file.url} alt={file.name} class="h-full w-full object-cover" />
							</div>
							<Button
								size="icon"
								variant="secondary"
								onclick={() => removeFile(i)}
								class="absolute -top-1.5 -right-1.5 size-5 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
							>
								<XIcon class="size-3" />
							</Button>
						</div>
					{/each}
				</div>
			{/if}

			<FileDropZone.Textarea>
				{#snippet child({ props })}
					<textarea
						{...props}
						bind:value={prompt}
						placeholder="Ask me anything..."
						class="placeholder:text-muted-foreground min-h-[44px] w-full resize-none border-0 bg-transparent text-[15px] focus:outline-none"
						rows={1}
					></textarea>
				{/snippet}
			</FileDropZone.Textarea>

			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<Select.Root type="single" bind:value={selectedModel}>
						<Select.Trigger size="sm" class="border-none">
							{models.find((m) => m.value === selectedModel)?.label}
						</Select.Trigger>
						<Select.Content align="start">
							{#each models as model (model.value)}
								<Select.Item value={model.value} label={model.label} />
							{/each}
						</Select.Content>
					</Select.Root>

					<FileDropZone.Trigger
						class={cn(
							buttonVariants({ variant: 'ghost', size: 'icon' }),
							'bg-accent size-8 cursor-pointer'
						)}
					>
						<ImageIcon class="text-muted-foreground size-5" />
					</FileDropZone.Trigger>
				</div>

				<Button variant="destructive" size="icon" class="size-8">
					<SendIcon class="size-4" />
				</Button>
			</div>
		</div>
	</FileDropZone.Root>
</div>
