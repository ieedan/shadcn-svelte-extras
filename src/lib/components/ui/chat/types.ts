import type { WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type ChatBubblePropsWithoutHTML = {
	variant: 'sent' | 'received';
};

export type ChatBubbleProps = WithElementRef<
	ChatBubblePropsWithoutHTML & HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

export type ChatBubbleMessagePropsWithoutHTML = {
	typing?: boolean;
};

export type ChatBubbleMessageProps = WithElementRef<
	ChatBubbleMessagePropsWithoutHTML & HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;
