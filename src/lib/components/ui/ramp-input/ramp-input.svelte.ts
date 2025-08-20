import { Context } from 'runed';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';

type RampInputRootProps = WritableBoxedValues<{
	value: number;
}> &
	ReadableBoxedValues<{
		rampBy: number;
		min?: number;
		max?: number;
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
};

export class RampInputButton {
	constructor(
		readonly rootState: RampInputRootContext,
		readonly opts: RampInputButtonProps
	) {
		this.ramp = this.ramp.bind(this);
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
