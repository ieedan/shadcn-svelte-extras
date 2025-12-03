import { Context } from 'runed';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';
import type { ButtonElementProps } from '../button';
import { useRamp, type UseRampOptions } from '$lib/hooks/use-ramp.svelte';

type NumberFieldRootProps = WritableBoxedValues<{
	value: number;
}> &
	ReadableBoxedValues<{
		step: number;
		min?: number;
		max?: number;
		rampSettings: Omit<UseRampOptions, 'increment' | 'canRamp'>;
	}>;

export class NumberFieldRootContext {
	constructor(readonly opts: NumberFieldRootProps) {}

	valid = $derived.by(() => {
		const value = this.opts.value.current;
		const min = this.opts.min?.current;
		const max = this.opts.max?.current;

		return (min === undefined || value >= min) && (max === undefined || value <= max);
	});
}

export class NumberFieldInputContext {
	constructor(readonly rootState: NumberFieldRootContext) {}

	oninput(e: Parameters<NonNullable<HTMLInputElement['oninput']>>[0]) {
		const value = (e.currentTarget as HTMLInputElement).value;

		if (
			this.rootState.opts.min?.current !== undefined &&
			Number(value) < this.rootState.opts.min.current
		) {
			this.rootState.opts.value.current = this.rootState.opts.min.current;
		}
		if (
			this.rootState.opts.max?.current !== undefined &&
			Number(value) > this.rootState.opts.max.current
		) {
			this.rootState.opts.value.current = this.rootState.opts.max.current;
		}
	}

	props = $derived.by(() => ({
		type: 'number',
		oninput: this.oninput.bind(this),
		min: this.rootState.opts.min?.current,
		max: this.rootState.opts.max?.current,
		'aria-invalid': !this.rootState.valid,
		step: this.rootState.opts.step.current
	}));
}

type NumberFieldButtonProps = {
	direction: 'up' | 'down';
} & ReadableBoxedValues<{
	onpointerdown: ButtonElementProps['onpointerdown'];
	onpointerup: ButtonElementProps['onpointerup'];
	onpointerleave: ButtonElementProps['onpointerleave'];
	onpointercancel: ButtonElementProps['onpointercancel'];
	onclick: ButtonElementProps['onclick'];
	disabled: boolean;
}>;

export class NumberFieldButton {
	rampState: ReturnType<typeof useRamp>;
	constructor(
		readonly rootState: NumberFieldRootContext,
		readonly opts: NumberFieldButtonProps
	) {
		this.increment = this.increment.bind(this);
		this.rampState = useRamp({
			increment: () => this.increment(),
			canRamp: () => this.enabled,
			...this.rootState.opts.rampSettings.current
		});
	}

	onpointerdown(e: Parameters<NonNullable<ButtonElementProps['onpointerdown']>>[0]) {
		this.increment();

		this.rampState.start();

		this.opts.onpointerdown.current?.(e);
	}

	onpointerup(e: Parameters<NonNullable<ButtonElementProps['onpointerup']>>[0]) {
		// we do this so that the click event is not triggered if the button was being held
		setTimeout(() => this.rampState.reset());
		this.opts.onpointerup.current?.(e);
	}

	onpointerleave(e: Parameters<NonNullable<ButtonElementProps['onpointerleave']>>[0]) {
		this.rampState.reset();
		this.opts.onpointerleave.current?.(e);
	}

	onpointercancel(e: Parameters<NonNullable<ButtonElementProps['onpointercancel']>>[0]) {
		this.rampState.reset();
		this.opts.onpointercancel.current?.(e);
	}

	onclick(e: Parameters<NonNullable<ButtonElementProps['onclick']>>[0]) {
		if (this.rampState.active) return;

		this.increment();

		this.opts.onclick.current?.(e);
	}

	increment() {
		const step =
			this.opts.direction === 'up'
				? this.rootState.opts.step.current
				: -this.rootState.opts.step.current;
		this.rootState.opts.value.current += step;
	}

	enabled = $derived.by(() => {
		const step =
			this.opts.direction === 'up'
				? this.rootState.opts.step.current
				: -this.rootState.opts.step.current;

		const newValue = this.rootState.opts.value.current + step;

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
		onpointerleave: this.onpointerleave.bind(this),
		onpointercancel: this.onpointercancel.bind(this),
		onclick: this.onclick.bind(this)
	}));

	destroy() {
		this.rampState.reset();
	}
}

const ctx = new Context<NumberFieldRootContext>('number-field-root');

export function useNumberField(props: NumberFieldRootProps) {
	return ctx.set(new NumberFieldRootContext(props));
}

export function useNumberFieldInput() {
	return new NumberFieldInputContext(ctx.get());
}

export function useNumberFieldButton(props: NumberFieldButtonProps) {
	return new NumberFieldButton(ctx.get(), props);
}
