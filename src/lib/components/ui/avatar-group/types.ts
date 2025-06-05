import type { Avatar as AvatarPrimitive, WithChildren, WithoutChildren } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type AvatarGroupRootPropsWithoutHTML = WithChildren<{
	ref?: HTMLElement | null;
	orientation?: 'vertical' | 'horizontal';
}>;

export type AvatarGroupRootProps = AvatarGroupRootPropsWithoutHTML &
	WithoutChildren<HTMLAttributes<HTMLDivElement>>;

export type AvatarGroupMemberProps = AvatarPrimitive.RootProps;

export type AvatarGroupEtcPropsWithoutHTML = WithChildren<{
	ref?: HTMLElement | null;
	plus: number;
}>;

export type AvatarGroupEtcProps = AvatarGroupEtcPropsWithoutHTML &
	WithoutChildren<HTMLAttributes<HTMLDivElement>>;
