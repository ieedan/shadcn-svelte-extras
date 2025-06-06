import type { WithChildren } from 'bits-ui';

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
	onSelect?: (emoji: string) => void;
}>;

export type EmojiPickerPickerProps = {
	search?: string;
	placeholder?: string;
	maxRecents?: number;
	emptyMessage?: string;
};
