import { Context, watch } from 'runed';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';
import type { EmojiPickerSkin } from './types';
import data, { type Emoji, type EmojiMartData } from '@emoji-mart/data';

const emojiData = data as EmojiMartData;

const SKIN_MAP = {
	'👋': 0,
	'👋🏻': 1,
	'👋🏼': 2,
	'👋🏽': 3,
	'👋🏾': 4,
	'👋🏿': 5
};

type EmojiPickerState = {
	search: string;
	active: {
		emoji: string;
		data: Emoji;
		skin: number;
	} | null;
};

const defaultState: EmojiPickerState = {
	search: '',
	active: null
};

type EmojiPickerRootProps = WritableBoxedValues<{
	value: string;
}> &
	ReadableBoxedValues<{ skin: EmojiPickerSkin; onSelect: (emoji: string) => void }>;

class EmojiPickerRootState {
	emojiPickerState = $state(defaultState);

	constructor(readonly opts: EmojiPickerRootProps) {
		this.select = this.select.bind(this);
		this.onValueChange = this.onValueChange.bind(this);
	}

	get skinIndex() {
		if (typeof this.opts.skin.current === 'number') return this.opts.skin.current;

		return SKIN_MAP[this.opts.skin.current];
	}

	select(emoji: string) {
		this.opts.value.current = emoji;

		this.opts.onSelect.current(emoji);
	}

	onValueChange(value: string) {
		const { name, skin } = parseValue(value);

		this.emojiPickerState.active = {
			emoji: emojiData.emojis[name].skins[skin].native,
			data: emojiData.emojis[name],
			skin
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
		return this.root.skinIndex;
	}

	select(emoji: string) {
		this.root.select(emoji);
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
