import type { Emoji } from '@emoji-mart/data';
import type { WithChildren, WithoutChild, WithoutChildren } from 'bits-ui';
import type { Command as CommandPrimitive } from 'bits-ui';
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import type { ButtonProps } from '$lib/components/button.svelte';

export type SelectedEmoji = {
	emoji: string;
	data: Emoji;
	skin: number;
};

/**
 * The skin tone modifier for the emoji
 *
 * ```
 * 0 = 👋
 * 1 = 👋🏻
 * 2 = 👋🏼
 * 3 = 👋🏽
 * 4 = 👋🏾
 * 5 = 👋🏿
 * ```
 */
export type EmojiPickerSkin = 0 | 1 | 2 | 3 | 4 | 5;

export type EmojiPickerRootPropsWithoutHTML = WithChildren<{
	/**
	 * The default skin to use
	 *
	 * @default 0
	 *
	 * ```
	 * 0 = 👋
	 * 1 = 👋🏻
	 * 2 = 👋🏼
	 * 3 = 👋🏽
	 * 4 = 👋🏾
	 * 5 = 👋🏿
	 * ```
	 */
	skin?: EmojiPickerSkin;
	onSelect?: (emoji: SelectedEmoji) => void;
	onSkinChange?: (skin: EmojiPickerSkin) => void;
}> &
	(
		| {
				/** Show recently used emojis */
				showRecents?: true;
				/** The key to use to store the recently used emojis */
				recentsKey: string;
				maxRecents?: number;
		  }
		| {
				/** Show recently used emojis */
				showRecents?: false | never;
				/** The key to use to store the recently used emojis */
				recentsKey?: never;
				maxRecents?: never;
		  }
	);

export type EmojiPickerRootProps = WithoutChild<
	Omit<CommandPrimitive.RootProps, 'filter' | 'shouldFilter' | 'columns' | 'onValueChange'>
> &
	EmojiPickerRootPropsWithoutHTML;

export type EmojiPickerListPropsWithoutHTML = {
	emptyMessage?: string;
};

export type EmojiPickerListProps = WithoutChildren<WithoutChild<CommandPrimitive.ListProps>> &
	EmojiPickerListPropsWithoutHTML;

export type EmojiPickerSearchProps = CommandPrimitive.InputProps;

export type EmojiPickerFooterPropsWithoutHTML = {
	children: Snippet<[{ active: SelectedEmoji | null }]>;
};

export type EmojiPickerFooterProps = WithoutChildren<HTMLAttributes<HTMLDivElement>> &
	EmojiPickerFooterPropsWithoutHTML;

export type EmojiPickerSkinPropsWithoutHTML = {
	/** The emoji to use to preview the skin tone
	 *
	 * @default '👋'
	 */
	previewEmoji?: string;
};

export type EmojiPickerSkinProps = EmojiPickerSkinPropsWithoutHTML & WithoutChildren<ButtonProps>;
