import type { Emoji } from '@emoji-mart/data';
import type { WithChildren, WithoutChild, WithoutChildren } from 'bits-ui';
import type { Command as CommandPrimitive } from 'bits-ui';
import type { Snippet } from 'svelte';

export type SelectedEmoji = {
	emoji: string;
	data: Emoji;
	skin: number;
};

/**
 * The skin tone modifier for the emoji
 *
 * 0 = 👋
 * 1 = 👋🏻
 * 2 = 👋🏼
 * 3 = 👋🏽
 * 4 = 👋🏾
 * 5 = 👋🏿
 */
export type EmojiPickerSkin = '👋' | '👋🏻' | '👋🏼' | '👋🏽' | '👋🏾' | '👋🏿' | 0 | 1 | 2 | 3 | 4 | 5;

export type EmojiPickerRootProps = WithChildren<{
	value?: string;
	/**
	 * The default skin to use
	 *
	 * @default '👋'
	 */
	skin?: EmojiPickerSkin;
	onSelect?: (emoji: SelectedEmoji) => void;
}>;

export type EmojiPickerListProps = WithoutChildren<WithoutChild<CommandPrimitive.ListProps>> & {
	maxRecents?: number;
	emptyMessage?: string;
};

export type EmojiPickerSearchProps = CommandPrimitive.InputProps;

export type EmojiPickerFooterProps = {
	children: Snippet<[{ active: SelectedEmoji | null }]>;
};
