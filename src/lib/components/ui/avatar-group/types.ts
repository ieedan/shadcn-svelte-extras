import type { Avatar as AvatarPrimitive, WithElementRef } from 'bits-ui';
import type { HTMLAttributes } from 'svelte/elements';

export type AvatarGroupRootPropsWithoutHTML = {
	orientation?: 'vertical' | 'horizontal';
};

export type AvatarGroupRootProps = WithElementRef<
	AvatarGroupRootPropsWithoutHTML & HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

export type AvatarGroupMemberProps = AvatarPrimitive.RootProps;

export type AvatarGroupEtcPropsWithoutHTML = {
	plus: number;
};

export type AvatarGroupEtcProps = WithElementRef<
	AvatarGroupEtcPropsWithoutHTML & HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;
