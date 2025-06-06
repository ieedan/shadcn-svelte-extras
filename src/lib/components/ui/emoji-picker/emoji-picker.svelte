<script lang="ts">
	import { box } from 'svelte-toolbelt';
	import type { EmojiPickerRootProps } from './types';
	import { useEmojiPicker } from './emoji-picker.svelte.js';

	let {
		value = $bindable(''),
		skin = '👋',
		onSelect = () => {},
		children,
		...rest
	}: EmojiPickerRootProps = $props();

	const state = useEmojiPicker({
		value: box.with(
			() => value,
			(v) => (value = v)
		),
		skin: box.with(() => skin),
		onSelect: box.with(() => onSelect)
	});
</script>

{@render children?.()}
