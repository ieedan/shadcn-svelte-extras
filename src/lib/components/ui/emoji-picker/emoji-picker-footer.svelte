<script lang="ts">
	import type { EmojiPickerFooterProps } from './types';
	import { useEmojiPickerFooter } from './emoji-picker.svelte.js';

	let { children }: EmojiPickerFooterProps = $props();

	const footerState = useEmojiPickerFooter();
</script>

<div class="border-border relative max-w-full border-t p-2">
	{@render children?.({ active: footerState.root.emojiPickerState.active })}
</div>
