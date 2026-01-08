<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { useFileDropZoneTrigger } from './file-drop-zone.svelte.js';
	import { displaySize } from './index.js';
	import type { FileDropZoneTriggerProps } from './types.js';
	import UploadIcon from '@lucide/svelte/icons/upload';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...rest
	}: FileDropZoneTriggerProps = $props();

	const triggerState = useFileDropZoneTrigger();
</script>

<label bind:this={ref} class={cn('', className)} {...triggerState.props} {...rest}>
	{#if children}
		{@render children()}
	{:else}
		<div class="flex flex-col place-items-center justify-center gap-2">
			<div
				class="border-border text-muted-foreground flex size-14 place-items-center justify-center rounded-full border border-dashed"
			>
				<UploadIcon class="size-7" />
			</div>
			<div class="flex flex-col gap-0.5 text-center">
				<span class="text-muted-foreground font-medium">
					Drag 'n' drop files here, or click to select files
				</span>
				{#if triggerState.rootState.opts.maxFiles.current || triggerState.rootState.opts.maxFileSize.current}
					<span class="text-muted-foreground/75 text-sm">
						{#if triggerState.rootState.opts.maxFiles.current}
							<span>
								You can upload {triggerState.rootState.opts.maxFiles.current} files
							</span>
						{/if}
						{#if triggerState.rootState.opts.maxFiles.current && triggerState.rootState.opts.maxFileSize.current}
							<span>
								(up to {displaySize(triggerState.rootState.opts.maxFileSize.current)} each)
							</span>
						{/if}
						{#if triggerState.rootState.opts.maxFileSize.current && !triggerState.rootState.opts.maxFiles.current}
							<span>
								Maximum size {displaySize(triggerState.rootState.opts.maxFileSize.current)}
							</span>
						{/if}
					</span>
				{/if}
			</div>
		</div>
	{/if}
</label>
