import type { WithChildren, WithoutChildren } from 'bits-ui';
import type { Snippet } from 'svelte';
import type { HTMLAttributes, HTMLButtonAttributes } from 'svelte/elements';

export type TreeViewRootProps = HTMLAttributes<HTMLDivElement>;

export type TreeViewFolderProps = WithChildren<{
	name: string;
	open?: boolean;
	selected?: boolean;
	class?: string;
	icon?: Snippet<[{ name: string; open: boolean }]>;
}>;

export type TreeViewFilePropsWithoutHTML = WithChildren<{
	name: string;
	selected?: boolean;
	icon?: Snippet<[{ name: string }]>;
}>;

export type TreeViewFileProps = WithoutChildren<HTMLButtonAttributes> &
	TreeViewFilePropsWithoutHTML;
