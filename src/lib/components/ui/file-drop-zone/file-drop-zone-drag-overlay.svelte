<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { useFileDropZoneDragOverlay } from './file-drop-zone.svelte.js';
	import type { FileDropZoneDragOverlayProps } from './types.js';
	import UploadIcon from '@lucide/svelte/icons/upload';
	import { Portal } from 'bits-ui';
	import { box, mergeProps } from 'svelte-toolbelt';

	let {
		ref = $bindable(null),
		class: className,
		disabled = false,
		portalProps,
		children,
		...rest
	}: FileDropZoneDragOverlayProps = $props();

	const dragOverlayState = useFileDropZoneDragOverlay({
		disabled: box.with(() => disabled)
	});

	const mergedProps = $derived(mergeProps(dragOverlayState.props, rest));
</script>

<svelte:window
	ondragenter={dragOverlayState.windowProps.ondragenter}
	ondragleave={dragOverlayState.windowProps.ondragleave}
	ondragover={dragOverlayState.windowProps.ondragover}
	ondragend={dragOverlayState.windowProps.ondragend}
	ondrop={dragOverlayState.windowProps.ondrop}
/>

{#if dragOverlayState.dragging}
	<Portal {...portalProps}>
		<div
			bind:this={ref}
			class={cn(
				'animate-in fade-in-0 fixed inset-0 z-50 flex place-items-center justify-center bg-black/10 p-6 duration-100 supports-backdrop-filter:backdrop-blur-xs',
				className
			)}
			{...mergedProps}
		>
			{#if children}
				{@render children()}
			{:else}
				<div
					class="bg-background/75 flex flex-col place-items-center justify-center gap-2 rounded-lg border border-dashed p-12"
				>
					<div
						class="border-border text-muted-foreground flex size-14 place-items-center justify-center rounded-full border border-dashed"
					>
						<UploadIcon class="size-7" />
					</div>
					<span class="text-muted-foreground font-medium">Drop files here to upload</span>
				</div>
			{/if}
		</div>
	</Portal>
{/if}
