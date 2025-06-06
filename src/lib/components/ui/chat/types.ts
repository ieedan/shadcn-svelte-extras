import type { WithChildren, WithoutChildren } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type ChatListPropsWithoutHTML = WithChildren<{
	ref?: HTMLDivElement | null;
}>;

export type ChatListProps = ChatListPropsWithoutHTML &
	WithoutChildren<HTMLAttributes<HTMLDivElement>>;

export type ChatBubblePropsWithoutHTML = WithChildren<{
	ref?: HTMLDivElement | null;
	variant: 'sent' | 'received';
}>;

export type ChatBubbleProps = ChatBubblePropsWithoutHTML &
	WithoutChildren<HTMLAttributes<HTMLDivElement>>;

export type ChatBubbleMessagePropsWithoutHTML = WithChildren<{
	ref?: HTMLDivElement | null;
	typing?: boolean;
}>;

export type ChatBubbleMessageProps = ChatBubbleMessagePropsWithoutHTML &
	WithoutChildren<HTMLAttributes<HTMLDivElement>>;
