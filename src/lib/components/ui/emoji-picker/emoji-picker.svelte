<script lang="ts">
	import { box } from 'svelte-toolbelt';
	import type { EmojiPickerRootProps } from './types';
	import { useEmojiPicker } from './emoji-picker.svelte.js';
	import { Command as CommandPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		value = $bindable(''),
		skin = $bindable(0),
		onSelect = () => {},
		showRecents = false,
		recentsKey = '',
		maxRecents = 12,
		onSkinChange = () => {},
		class: className,
		loop = false,
		vimBindings = true,
		onkeydowncapture,
		children,
		...rest
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
		loop: box.with(() => loop),
		vimBindings: box.with(() => vimBindings),
		recentsKey: box.with(() => recentsKey),
		maxRecents: box.with(() => maxRecents),
		onSelect: box.with(() => onSelect),
		onSkinChange: box.with(() => onSkinChange)
	});
</script>

<CommandPrimitive.Root
	bind:value={state.commandValue}
	{...rest}
	{loop}
	{vimBindings}
	onkeydowncapture={(event) => {
		if (!state.replayedKeys.has(event)) onkeydowncapture?.(event);
		void state.list?.onkeydowncapture(event);
	}}
	columns={6}
	shouldFilter={false}
	class={cn('max-w-[232px]', className)}
	onValueChange={state.onValueChange}
>
	{@render children?.()}
</CommandPrimitive.Root>
