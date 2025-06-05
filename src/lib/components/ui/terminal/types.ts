import type { WithChildren } from 'bits-ui';
import type { Snippet } from 'svelte';

export type TerminalRootProps = WithChildren<{
	class?: string;
	delay?: number;
	speed?: number;
	onComplete?: () => void;
}>;

export type TerminalLoopProps = WithChildren<{
	delay?: number;
}>;

export type TerminalAnimationProps = WithChildren<{
	delay?: number;
	class?: string;
}>;

export type TerminalLoadingProps = Omit<TerminalAnimationProps, 'children'> & {
	loadingMessage: Snippet<[]>;
	completeMessage: Snippet<[]>;
	duration?: number;
};
