<script lang="ts">
	import { useFileDropZonePasteCapture } from './file-drop-zone.svelte.js';
	import type { FileDropZonePasteCaptureProps } from './types.js';
	import { box } from 'svelte-toolbelt';

	let { disabled = false, onpaste }: FileDropZonePasteCaptureProps = $props();

	const pasteCaptureState = useFileDropZonePasteCapture({
		disabled: box.with(() => disabled),
		onpaste: box.with(() => onpaste)
	});
</script>

<svelte:document onpaste={pasteCaptureState.props.onpaste} />
