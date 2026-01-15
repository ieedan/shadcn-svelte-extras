import type { WithChild } from 'svelte-toolbelt';
import type { ButtonSize, ButtonVariant } from '../button';
import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';

export type StepperRootProps = {
	step?: number;
	children?: Snippet;
};

export type StepperNavPropsWithoutHTML = {
	orientation?: 'horizontal' | 'vertical';
};

export type StepperNavProps = StepperNavPropsWithoutHTML & HTMLAttributes<HTMLDivElement>;

export type StepperItemPropsWithoutHTML = {
	id?: string;
};

export type StepperItemProps = StepperItemPropsWithoutHTML &
	Omit<HTMLAttributes<HTMLDivElement>, 'id'>;

export type StepperButtonPropsWithoutHTML = WithChild<{
	disabled?: boolean;
	variant?: ButtonVariant;
	size?: ButtonSize;
}>;

export type StepperNextButtonProps = StepperButtonPropsWithoutHTML;
export type StepperPreviousButtonProps = StepperButtonPropsWithoutHTML;
