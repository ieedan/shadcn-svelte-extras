<script lang="ts">
	import type { EmojiPickerFooterProps } from './types';
	import { useEmojiPickerFooter } from './emoji-picker.svelte.js';
	import { cn } from '$lib/utils.js';

	let { class: className, children, ...rest }: EmojiPickerFooterProps = $props();

	const footerState = useEmojiPickerFooter();
</script>

<div {...rest} class={cn('border-border relative max-w-full border-t p-2', className)}>
	{@render children?.({ active: footerState.root.emojiPickerState.active })}
</div>
