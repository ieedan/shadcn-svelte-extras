<script lang="ts">
	import type { EmojiPickerFooterProps } from './types.ts';
	import { useEmojiPickerFooter } from './emoji-picker.svelte.ts';
	import { cn } from '#lib/utils.ts';

	let { class: className, children, ...rest }: EmojiPickerFooterProps = $props();

	const footerState = useEmojiPickerFooter();
</script>

<div {...rest} class={cn('border-border relative max-w-full border-t p-2', className)}>
	{@render children?.({ active: footerState.root.emojiPickerState.active })}
</div>
