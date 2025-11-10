<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import { Command as CommandPrimitive } from 'bits-ui';
	import data, { type EmojiMartData } from '@emoji-mart/data';
	import * as casing from '$lib/utils/casing';
	import type { EmojiPickerListProps } from './types';
	import { makeValue, parseValue, useEmojiPickerList } from './emoji-picker.svelte.js';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		emptyMessage = 'No results.',
		class: className,
		...rest
	}: EmojiPickerListProps = $props();

	const emojiData = data as EmojiMartData;

	const filter = (value: string, keywords: string[]) => {
		if (!Array.isArray(keywords)) {
			return false;
		}

		for (const keyword of keywords) {
			if (keyword.toLowerCase().startsWith(value.toLowerCase())) return true;
		}

		return false;
	};

	const pickerState = useEmojiPickerList();
</script>

<Command.List bind:ref class={cn('relative h-[200px]', className)} {...rest}>
	<Command.Empty class="absolute inset-0 flex place-items-center justify-center py-0">
		{emptyMessage}
	</Command.Empty>
	{#if pickerState.showRecents}
		{@const recents = pickerState.root.frecency?.items
			.filter((item) => {
				const { name } = parseValue(item);
				return filter(pickerState.root.emojiPickerState.search, emojiData.emojis[name].keywords);
			})
			.slice(0, pickerState.maxRecents)}
		{#if recents && recents.length > 0}
			<CommandPrimitive.Group>
				<CommandPrimitive.GroupHeading class="text-muted-foreground px-2 py-1 text-xs">
					Recents
				</CommandPrimitive.GroupHeading>
				<CommandPrimitive.GroupItems class="grid grid-cols-6 px-2">
					{#each recents as item (item)}
						{@const { name, skin } = parseValue(item)}
						{@const emoji = emojiData.emojis[name].skins[skin].native}
						<Command.Item
							class="flex aspect-square size-9 place-items-center justify-center text-lg"
							value="{item}:recent"
							onSelect={() => {
								pickerState.select(item);
								pickerState.root.frecency?.use(item);
							}}
						>
							{emoji}
						</Command.Item>
					{/each}
				</CommandPrimitive.GroupItems>
			</CommandPrimitive.Group>
		{/if}
	{/if}
	{#each emojiData.categories as category (category.id)}
		{@const emojis = category.emojis.filter((item) =>
			filter(pickerState.root.emojiPickerState.search, emojiData.emojis[item].keywords)
		)}
		{#if emojis.length > 0}
			<CommandPrimitive.Group>
				<CommandPrimitive.GroupHeading class="text-muted-foreground px-2 py-1 text-xs">
					{casing.camelToPascal(category.id)}
				</CommandPrimitive.GroupHeading>
				<CommandPrimitive.GroupItems class="grid grid-cols-6 px-2">
					{#each emojis as item (item)}
						{@const emoji = emojiData.emojis[item]}
						{@const emojiSkin = emoji.skins.length > 1 ? pickerState.skinIndex : 0}
						{@const key = makeValue(item, emojiSkin)}
						<Command.Item
							class="flex aspect-square size-9 place-items-center justify-center text-lg"
							value={item}
							onSelect={() => {
								pickerState.select(key);
								pickerState.root.frecency?.use(key);
							}}
						>
							{emoji.skins[emojiSkin].native}
						</Command.Item>
					{/each}
				</CommandPrimitive.GroupItems>
			</CommandPrimitive.Group>
		{/if}
	{/each}
</Command.List>
