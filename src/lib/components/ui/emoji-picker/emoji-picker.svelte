<script lang="ts">
	import { box } from 'svelte-toolbelt';
	import type { EmojiPickerRootProps } from './types';
	import { useEmojiPicker } from './emoji-picker.svelte.js';
	import { Command as CommandPrimitive } from 'bits-ui';

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

<CommandPrimitive.Root
	columns={6}
	shouldFilter={false}
	style="display: contents"
	class="max-w-[232px]"
	onValueChange={state.onValueChange}
>
	{@render children?.()}
</CommandPrimitive.Root>
