<script lang="ts">
	import { box } from 'svelte-toolbelt';
	import type { EmojiPickerRootProps } from './types';
	import { useEmojiPicker } from './emoji-picker.svelte.js';
	import { Command as CommandPrimitive } from 'bits-ui';

	let {
		value = $bindable(''),
		skin = $bindable(0),
		onSelect = () => {},
		showRecents = false,
		recentsKey = '',
		maxRecents = 12,
		onSkinChange = () => {},
		children
	}: EmojiPickerRootProps = $props();

	const state = useEmojiPicker({
		value: box.with(
			() => value,
			(v) => (value = v)
		),
		skin: box.with(
			() => skin,
			(v) => (skin = v)
		),
		showRecents: box.with(() => showRecents),
		recentsKey: box.with(() => recentsKey),
		maxRecents: box.with(() => maxRecents),
		onSelect: box.with(() => onSelect),
		onSkinChange: box.with(() => onSkinChange)
	});
</script>

<CommandPrimitive.Root
	columns={6}
	shouldFilter={false}
	class="max-w-[232px]"
	onValueChange={state.onValueChange}
>
	{@render children?.()}
</CommandPrimitive.Root>
