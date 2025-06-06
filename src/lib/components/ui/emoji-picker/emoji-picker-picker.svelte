<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import { Command as CommandPrimitive } from 'bits-ui';
	import data, { type EmojiMartData } from '@emoji-mart/data';
	import { UseFrecency } from '$lib/hooks/use-frecency.svelte';
	import * as casing from '$lib/utils/casing';
	import type { EmojiPickerPickerProps } from './types';
	import { useEmojiPickerPicker } from './emoji-picker.svelte.js';

	let {
		search = $bindable(''),
		maxRecents = 18,
		placeholder = 'Search',
		emptyMessage = 'No results.'
	}: EmojiPickerPickerProps = $props();

	const emojiData = data as EmojiMartData;

	const frecency = new UseFrecency('emoji-picker-frecency');

	const filter = (value: string, keywords: string[]) => {
		if (!Array.isArray(keywords)) {
			return false;
		}

		for (const keyword of keywords) {
			if (keyword.toLowerCase().startsWith(value.toLowerCase())) return true;
		}

		return false;
	};

	function parseKey(emojiKey: string): { name: string; skin: number } {
		const [name, skin] = emojiKey.split(':');
		return { name, skin: Number(skin) };
	}

	function makeKey(name: string, skin: number) {
		return `${name}:${skin}`;
	}

	const pickerState = useEmojiPickerPicker();
</script>

<Command.Root columns={6} shouldFilter={false} class="max-w-[232px]">
	<Command.Input bind:value={search} {placeholder} />
	<Command.List class="h-[200px]">
		<Command.Empty class="flex h-[200px] place-items-center justify-center py-0">
			{emptyMessage}
		</Command.Empty>
		{#if maxRecents > 0}
			{@const recents = frecency.items
				.filter((item) => {
					const { name } = parseKey(item);
					return filter(search, emojiData.emojis[name].keywords);
				})
				.slice(0, maxRecents)}
			{#if recents.length > 0}
				<CommandPrimitive.Group>
					<CommandPrimitive.GroupHeading class="text-muted-foreground px-2 py-1 text-xs">
						Recents
					</CommandPrimitive.GroupHeading>
					<CommandPrimitive.GroupItems class="grid grid-cols-6 px-2">
						{#each recents as item (item)}
							{@const { name, skin } = parseKey(item)}
							{@const emoji = emojiData.emojis[name].skins[skin].native}
							<Command.Item
								class="flex aspect-square size-9 place-items-center justify-center text-lg"
								value="{item}-recent"
								onSelect={() => {
									pickerState.select(emoji);
									frecency.use(item);
								}}
							>
								{emoji}
							</Command.Item>
						{/each}
					</CommandPrimitive.GroupItems>
				</CommandPrimitive.Group>
			{/if}
		{/if}
		{#each emojiData.categories as category}
			{@const emojis = category.emojis.filter((item) =>
				filter(search, emojiData.emojis[item].keywords)
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
							{@const key = makeKey(item, emojiSkin)}
							<Command.Item
								class="flex aspect-square size-9 place-items-center justify-center text-lg"
								value={item}
								onSelect={() => {
									pickerState.select(emoji.skins[emojiSkin].native);
									frecency.use(key);
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
</Command.Root>
