import { Context, watch } from 'runed';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';
import type { EmojiPickerSkin, SelectedEmoji } from './types';
import data, { type EmojiMartData } from '@emoji-mart/data';
import { UseFrecency } from '$lib/hooks/use-frecency.svelte';

const emojiData = data as EmojiMartData;

type EmojiPickerState = {
	search: string;
	active: SelectedEmoji | null;
};

const defaultState: EmojiPickerState = {
	search: '',
	active: null
};

type EmojiPickerRootProps = WritableBoxedValues<{
	value: string;
	skin: EmojiPickerSkin;
}> &
	ReadableBoxedValues<{
		onSelect: (emoji: SelectedEmoji) => void;
		showRecents: boolean;
		recentsKey: string;
		maxRecents: number;
		onSkinChange: (skin: EmojiPickerSkin) => void;
	}>;

class EmojiPickerRootState {
	emojiPickerState = $state(defaultState);
	frecency: UseFrecency | null;

	constructor(readonly opts: EmojiPickerRootProps) {
		this.select = this.select.bind(this);
		this.onValueChange = this.onValueChange.bind(this);

		if (this.opts.showRecents) {
			if (!this.opts.recentsKey)
				throw new Error('[emoji-picker] recentsKey is required when recents is true');

			this.frecency = new UseFrecency(
				this.opts.recentsKey.current,
				{},
				{ maxItems: this.opts.maxRecents.current }
			);
		} else {
			this.frecency = null;
		}
	}

	select(emoji: string) {
		const { name, skin } = parseValue(emoji);

		const selected = {
			emoji: emojiData.emojis[name].skins[skin].native,
			data: emojiData.emojis[name],
			skin
		};

		this.opts.value.current = selected.emoji;

		this.opts.onSelect.current(selected);
	}

	onValueChange(value: string) {
		if (value === '') {
			this.emojiPickerState.active = null;
			return;
		}

		const { name, skin } = parseValue(value);

		const emojiSkin = skin ? skin : this.opts.skin.current;

		const data = emojiData.emojis[name];

		if (data.skins.length === 1) {
			this.emojiPickerState.active = {
				emoji: data.skins[0].native,
				data: data,
				skin: 0
			};
			return;
		}

		this.emojiPickerState.active = {
			emoji: data.skins[emojiSkin].native,
			data: data,
			skin: emojiSkin
		};
	}
}

export function parseValue(emojiKey: string): { name: string; skin: number } {
	const [name, skin] = emojiKey.split(':');
	return { name, skin: skin ? Number(skin) : 0 };
}

export function makeValue(name: string, skin: number) {
	return `${name}:${skin}`;
}

class EmojiPickerListState {
	constructor(readonly root: EmojiPickerRootState) {
		this.select = this.select.bind(this);
	}

	get skinIndex() {
		return this.root.opts.skin.current;
	}

	select(emoji: string) {
		this.root.select(emoji);
	}

	get maxRecents() {
		if (this.root.opts.showRecents) {
			return this.root.opts.maxRecents.current;
		}

		return 0;
	}

	get showRecents() {
		return this.root.opts.showRecents.current && this.root.frecency !== null;
	}
}

type EmojiPickerInputProps = WritableBoxedValues<{
	value: string;
}>;

class EmojiPickerInputState {
	constructor(
		readonly root: EmojiPickerRootState,
		readonly opts: EmojiPickerInputProps
	) {
		watch(
			() => this.opts.value.current,
			() => {
				this.root.emojiPickerState.search = this.opts.value.current;
			}
		);
	}
}

class EmojiPickerFooterState {
	constructor(readonly root: EmojiPickerRootState) {}
}

type EmojiPickerSkinProps = ReadableBoxedValues<{
	previewEmoji: string;
}>;

class EmojiPickerSkinToneSelectorState {
	constructor(
		readonly root: EmojiPickerRootState,
		readonly opts: EmojiPickerSkinProps
	) {
		this.cycleSkinTone = this.cycleSkinTone.bind(this);
	}

	previewEmoji = $derived.by(() => {
		for (const emoji of Object.entries(emojiData.emojis)) {
			const [_, data] = emoji;

			let found = false;
			for (const skin of data.skins) {
				if (skin.native === this.opts.previewEmoji.current) {
					found = true;
					break;
				}
			}

			if (!found) continue;

			if (data.skins.length === 0) {
				throw new Error(
					`The selected previewEmoji: ${this.opts.previewEmoji.current} does not have multiple skins!`
				);
			}

			return data;
		}

		return null;
	});

	get preview() {
		if (!this.previewEmoji) return null;

		return this.previewEmoji.skins[this.root.opts.skin.current].native;
	}

	cycleSkinTone() {
		if (!this.previewEmoji) return;

		if (this.root.opts.skin.current + 1 > 5) {
			this.root.opts.skin.current = 0;
		} else {
			this.root.opts.skin.current += 1;
		}

		this.root.opts.onSkinChange.current(this.root.opts.skin.current as EmojiPickerSkin);
	}
}

const ctx = new Context<EmojiPickerRootState>('emoji-picker-root-state');

export function useEmojiPicker(props: EmojiPickerRootProps) {
	return ctx.set(new EmojiPickerRootState(props));
}

export function useEmojiPickerList() {
	return new EmojiPickerListState(ctx.get());
}

export function useEmojiPickerInput(props: EmojiPickerInputProps) {
	return new EmojiPickerInputState(ctx.get(), props);
}

export function useEmojiPickerFooter() {
	return new EmojiPickerFooterState(ctx.get());
}

export function useEmojiPickerSkinToneSelector(props: EmojiPickerSkinProps) {
	return new EmojiPickerSkinToneSelectorState(ctx.get(), props);
}
