import type { WithChildren, WithoutChildren } from 'bits-ui';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { CopyButtonProps } from '$lib/components/ui/copy-button/types';

export type PasswordRootProps = WithChildren<{
	hidden?: boolean;
}>;

export type PasswordInputPropsWithoutHTML = WithChildren;

export type PasswordInputProps = Omit<WithoutChildren<HTMLInputAttributes>, 'type' | 'files'> &
	PasswordInputPropsWithoutHTML;

export type PasswordToggleVisibilityProps = {
	class?: string;
};

export type PasswordCopyButtonProps = Omit<CopyButtonProps, 'children' | 'text'>;
