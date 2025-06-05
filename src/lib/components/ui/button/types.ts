import type { WithChildren, WithoutChildren } from 'bits-ui';
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
import type { ButtonSize, ButtonVariant } from '.';

export type ButtonPropsWithoutHTML = WithChildren<{
	ref?: HTMLElement | null;
	variant?: ButtonVariant;
	size?: ButtonSize;
	loading?: boolean;
	onClickPromise?: (
		e: MouseEvent & {
			currentTarget: EventTarget & HTMLButtonElement;
		}
	) => Promise<void>;
}>;

export type AnchorElementProps = ButtonPropsWithoutHTML &
	WithoutChildren<Omit<HTMLAnchorAttributes, 'href' | 'type'>> & {
		href: HTMLAnchorAttributes['href'];
		type?: never;
		disabled?: HTMLButtonAttributes['disabled'];
	};

export type ButtonElementProps = ButtonPropsWithoutHTML &
	WithoutChildren<Omit<HTMLButtonAttributes, 'type' | 'href'>> & {
		type?: HTMLButtonAttributes['type'];
		href?: never;
		disabled?: HTMLButtonAttributes['disabled'];
	};

export type ButtonProps = AnchorElementProps | ButtonElementProps;
