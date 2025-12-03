import { Context } from 'runed';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';
import type { ButtonElementProps } from '../button';
import { useRamp, type UseRampOptions } from '$lib/hooks/use-ramp.svelte';

type RampInputRootProps = WritableBoxedValues<{
	value: number;
}> &
	ReadableBoxedValues<{
		rampBy: number;
		min?: number;
		max?: number;
		rampSettings: Omit<UseRampOptions, 'increment' | 'canRamp'>;
	}>;

export class RampInputRootContext {
	constructor(readonly opts: RampInputRootProps) {}

	valid = $derived.by(() => {
		const value = this.opts.value.current;
		const min = this.opts.min?.current;
		const max = this.opts.max?.current;

		return (min === undefined || value >= min) && (max === undefined || value <= max);
	});
}

export class RampInputInputContext {
	constructor(readonly rootState: RampInputRootContext) {}
}

type RampInputButtonProps = {
	direction: 'up' | 'down';
} & ReadableBoxedValues<{
	onpointerdown: ButtonElementProps['onpointerdown'];
	onpointerup: ButtonElementProps['onpointerup'];
	onclick: ButtonElementProps['onclick'];
	disabled: boolean;
}>;

export class RampInputButton {
	rampState: ReturnType<typeof useRamp>;
	constructor(
		readonly rootState: RampInputRootContext,
		readonly opts: RampInputButtonProps
	) {
		this.ramp = this.ramp.bind(this);
		this.rampState = useRamp({
			increment: () => this.ramp(),
			canRamp: () => this.enabled,
			...this.rootState.opts.rampSettings.current
		});
	}

	onpointerdown(e: Parameters<NonNullable<ButtonElementProps['onpointerdown']>>[0]) {
		this.ramp();

		this.rampState.start();

		this.opts.onpointerdown.current?.(e);
	}

	onpointerup(e: Parameters<NonNullable<ButtonElementProps['onpointerup']>>[0]) {
		// we do this so that the click event is not triggered if the button was being held
		setTimeout(() => this.rampState.reset());
		this.opts.onpointerup.current?.(e);
	}

	onclick(e: Parameters<NonNullable<ButtonElementProps['onclick']>>[0]) {
		if (this.rampState.active) return;

		this.ramp();

		this.opts.onclick.current?.(e);
	}

	ramp() {
		const rampBy =
			this.opts.direction === 'up'
				? this.rootState.opts.rampBy.current
				: -this.rootState.opts.rampBy.current;
		this.rootState.opts.value.current += rampBy;
	}

	enabled = $derived.by(() => {
		const rampBy =
			this.opts.direction === 'up'
				? this.rootState.opts.rampBy.current
				: -this.rootState.opts.rampBy.current;

		const newValue = this.rootState.opts.value.current + rampBy;

		if (
			this.rootState.opts.min?.current !== undefined &&
			newValue < this.rootState.opts.min.current
		) {
			return false;
		}

		if (
			this.rootState.opts.max?.current !== undefined &&
			newValue > this.rootState.opts.max.current
		) {
			return false;
		}

		return true;
	});

	props = $derived.by(() => ({
		disabled: !this.enabled || this.opts.disabled.current,
		onpointerdown: this.onpointerdown.bind(this),
		onpointerup: this.onpointerup.bind(this),
		onclick: this.onclick.bind(this)
	}));
}

const ctx = new Context<RampInputRootContext>('ramp-input-root');

export function useRampInput(props: RampInputRootProps) {
	return ctx.set(new RampInputRootContext(props));
}

export function useRampInputInput() {
	return new RampInputInputContext(ctx.get());
}

export function useRampInputButton(props: RampInputButtonProps) {
	return new RampInputButton(ctx.get(), props);
}
