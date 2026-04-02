<script lang="ts">
	import { box } from 'svelte-toolbelt';
	import { useEmojiPickerSkinToneSelector } from './emoji-picker.svelte.js';
	import type { EmojiPickerSkinProps } from './types.js';
	import Button, { type ButtonProps } from '$lib/components/button.svelte';
	import { cn } from '$lib/utils.js';

	let {
		previewEmoji = '👋',
		variant = 'outline',
		size = 'icon',
		class: className,
		onclick,
		...rest
	}: EmojiPickerSkinProps = $props();

	const skinState = useEmojiPickerSkinToneSelector({
		previewEmoji: box.with(() => previewEmoji)
	});
</script>

<Button
	{...rest /* eslint-disable-line @typescript-eslint/no-explicit-any */ as any}
	{variant}
	{size}
	class={cn('size-8', className)}
	onclick={(e: Parameters<NonNullable<ButtonProps['onclick']>>[0]) => {
		onclick?.(e);
		skinState.cycleSkinTone();
	}}
>
	{skinState.preview}
</Button>
