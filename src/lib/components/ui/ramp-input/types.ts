import type { Snippet } from 'svelte';
import type { HTMLInputAttributes } from 'svelte/elements';
import type { ButtonElementProps } from '../button';
import type { UseRampOptions } from '$lib/hooks/use-ramp.svelte';

export type RampInputRootProps = {
	value: number;
	rampBy: number;
	min?: number;
	max?: number;
	rampSettings?: Omit<UseRampOptions, 'increment' | 'canRamp'>;
	children: Snippet;
};

export type RampButtonProps = Omit<ButtonElementProps, 'disabled'> & {
	disabled?: boolean;
};

export type RampInputInputProps = Omit<HTMLInputAttributes, 'min' | 'max' | 'value' | 'type'>;
