import { Context } from 'runed';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';
import type { EmojiPickerSkin } from './types';

const SKIN_MAP = {
	'👋': 0,
	'👋🏻': 1,
	'👋🏼': 2,
	'👋🏽': 3,
	'👋🏾': 4,
	'👋🏿': 5
};

type EmojiPickerRootProps = WritableBoxedValues<{
	value: string;
}> &
	ReadableBoxedValues<{ skin: EmojiPickerSkin; onSelect: (emoji: string) => void }>;

class EmojiPickerRootState {
	constructor(readonly opts: EmojiPickerRootProps) {
		this.select = this.select.bind(this);
	}

	get skinIndex() {
		if (typeof this.opts.skin.current === 'number') return this.opts.skin.current;

		return SKIN_MAP[this.opts.skin.current];
	}

	select(emoji: string) {
		this.opts.value.current = emoji;

		this.opts.onSelect.current(emoji);
	}
}

class EmojiPickerPickerState {
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

const ctx = new Context<EmojiPickerRootState>('emoji-picker-root-state');

export function useEmojiPicker(props: EmojiPickerRootProps) {
	return ctx.set(new EmojiPickerRootState(props));
}

export function useEmojiPickerPicker() {
	return new EmojiPickerPickerState(ctx.get());
}
