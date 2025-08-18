import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { ButtonElementProps } from '../button';

export type RampInputRootProps = {
	value?: number;
	rampBy?: number;
	min?: number;
	max?: number;
	children?: Snippet;
};

export type RampButtonProps = Omit<ButtonElementProps, 'onpointerdown' | 'disabled'>;

export type RampInputInputProps = Omit<HTMLInputAttributes, 'min' | 'max' | 'value' | 'type'>;
