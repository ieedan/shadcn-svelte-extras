import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { ButtonElementProps } from '../button';
import type { UseRampOptions } from '$lib/hooks/use-ramp.svelte';
import type { WithElementRef } from '$lib/utils';

export type NumberFieldRootProps = {
	value?: number;
	step?: number;
	min?: number;
	max?: number;
	rampSettings?: Omit<UseRampOptions, 'increment' | 'canRamp'>;
	children: Snippet;
};

export type RampButtonProps = Omit<ButtonElementProps, 'disabled' | 'tabindex'> & {
	disabled?: boolean;
};

export type NumberFieldInputProps = WithElementRef<
	Omit<HTMLInputAttributes, 'min' | 'max' | 'value' | 'type'>
>;

