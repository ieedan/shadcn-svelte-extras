<script lang="ts">
	import { box } from 'svelte-toolbelt';
	import type { EmojiPickerRootProps } from './types';
	import { useEmojiPicker } from './emoji-picker.svelte.js';
	import { Command as CommandPrimitive } from 'bits-ui';

	let {
		value = $bindable(''),
		skin = $bindable(0),
		onSelect = () => {},
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
		onSelect: box.with(() => onSelect)
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
