import { Context, watch } from 'runed';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';
import type { HTMLButtonAttributes } from 'svelte/elements';

type StepperRootProps = WritableBoxedValues<{
	step: number;
}>;

class StepperRootState {
	steps: { id: string; triggerRef: () => HTMLButtonElement | null }[] = $state([]);
	constructor(readonly opts: StepperRootProps) {}

	registerStep(step: StepperItemState): number {
		return this.steps.push({ id: step.opts.id, triggerRef: () => step.getTriggerRef() });
	}

	next() {
		if (!this.canIncrement) return;
		this.opts.step.current++;
	}

	canIncrement = $derived.by(() => {
		return this.steps.length > this.opts.step.current;
	});

	previous() {
		if (!this.canDecrement) return;
		this.opts.step.current--;
	}

	canDecrement = $derived.by(() => {
		return this.opts.step.current > 1;
	});

	selectStep(stepId: string) {
		this.opts.step.current = this.steps.findIndex((step) => step.id === stepId) + 1;
	}

	navigateNext() {
		const nextStep = this.steps[this.opts.step.current];
		if (!nextStep) return;

		const triggerRef = nextStep.triggerRef();
		if (triggerRef?.disabled) return;

		this.opts.step.current++;
		triggerRef?.focus();
	}

	navigatePrevious() {
		const previousStep = this.steps[this.opts.step.current - 2];
		if (!previousStep) return;

		const triggerRef = previousStep.triggerRef();
		if (triggerRef?.disabled) return;

		this.opts.step.current--;
		triggerRef?.focus();
	}
}

type StepperNavProps = ReadableBoxedValues<{
	orientation: 'horizontal' | 'vertical';
}>;

class StepperNavState {
	constructor(readonly opts: StepperNavProps) {}

	props = $derived.by(() => ({
		'aria-orientation': this.opts.orientation.current,
		'data-orientation': this.opts.orientation.current
	}));
}

type StepperItemProps = {
	id: string;
};

class StepperItemState {
	step: number;
	triggerRef = $state<HTMLButtonElement | null>(null);
	constructor(
		readonly opts: StepperItemProps,
		readonly navState: StepperNavState,
		readonly rootState: StepperRootState
	) {
		this.step = this.rootState.registerStep(this);
	}

	getTriggerRef() {
		return this.triggerRef;
	}

	isLast = $derived.by(() => {
		return this.step === this.rootState.steps.length;
	});

	isFirst = $derived.by(() => {
		return this.step === 1;
	});

	state: 'active' | 'completed' | 'inactive' = $derived.by(() => {
		if (this.step < this.rootState.opts.step.current) return 'completed';
		if (this.step === this.rootState.opts.step.current) return 'active';
		return 'inactive';
	});

	props = $derived.by(() => ({
		id: this.opts.id,
		'data-step': this.opts.id,
		'data-state': this.state
	}));
}

type StepperItemTriggerProps = ReadableBoxedValues<{
	ref: HTMLButtonElement | null;
	disabled: boolean;
	onclick: HTMLButtonAttributes['onclick'];
	onkeydown: HTMLButtonAttributes['onkeydown'];
}>;

class StepperItemTriggerState {
	constructor(
		readonly opts: StepperItemTriggerProps,
		readonly itemState: StepperItemState
	) {
		watch(
			() => this.opts.ref.current,
			(ref) => {
				this.itemState.triggerRef = ref;
			}
		);
	}

	_onclick(e: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		this.itemState.rootState.selectStep(this.itemState.opts.id);
		this.opts.onclick.current?.(e);
	}

	_onkeydown(e: KeyboardEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		if (this.opts.disabled.current) return;
		switch (e.key) {
			case 'ArrowRight':
				if (this.itemState.navState.opts.orientation.current === 'vertical') return;
				this.itemState.rootState.navigateNext();
				break;
			case 'ArrowLeft':
				if (this.itemState.navState.opts.orientation.current === 'vertical') return;
				this.itemState.rootState.navigatePrevious();
				break;
			case 'ArrowDown':
				if (this.itemState.navState.opts.orientation.current === 'horizontal') return;
				e.preventDefault(); // prevent default scroll behavior
				this.itemState.rootState.navigateNext();
				break;
			case 'ArrowUp':
				if (this.itemState.navState.opts.orientation.current === 'horizontal') return;
				e.preventDefault(); // prevent default scroll behavior
				this.itemState.rootState.navigatePrevious();
				break;
		}
		this.opts.onkeydown.current?.(e);
	}

	props = $derived.by(() => ({
		id: `${this.itemState.opts.id}-trigger`,
		disabled: this.opts.disabled.current,
		onclick: this._onclick.bind(this),
		onkeydown: this._onkeydown.bind(this),
		'data-state': this.itemState.state,
		'aria-selected': this.itemState.state === 'active'
	}));
}

class StepperSeparatorState {
	constructor(readonly itemState: StepperItemState) {}

	props = $derived.by(() => ({
		'data-state': this.itemState.state
	}));
}

type StepperStepButtonProps = ReadableBoxedValues<{
	type: 'next' | 'previous';
	disabled: boolean;
}>;

class StepperStepButtonState {
	constructor(
		readonly opts: StepperStepButtonProps,
		readonly rootState: StepperRootState
	) {}

	_disabled = $derived.by(() => {
		if (this.opts.disabled.current) return true;
		if (this.opts.type.current === 'next') {
			return !this.rootState.canIncrement;
		}
		return !this.rootState.canDecrement;
	});

	onclick() {
		if (this.opts.type.current === 'next') {
			this.rootState.next();
			return;
		}
		this.rootState.previous();
	}

	props = $derived.by(() => ({
		disabled: this._disabled,
		onclick: this.onclick.bind(this)
	}));
}

const StepperCtx = new Context<StepperRootState>('stepper-root-ctx');
const StepperNavCtx = new Context<StepperNavState>('stepper-nav-ctx');
const StepperItemCtx = new Context<StepperItemState>('stepper-item-ctx');

export function useStepperRoot(props: StepperRootProps) {
	return StepperCtx.set(new StepperRootState(props));
}

export function useStepperNav(props: StepperNavProps) {
	return StepperNavCtx.set(new StepperNavState(props));
}

export function useStepperItem(props: StepperItemProps) {
	return StepperItemCtx.set(new StepperItemState(props, StepperNavCtx.get(), StepperCtx.get()));
}

export function useStepperItemTrigger(props: StepperItemTriggerProps) {
	return new StepperItemTriggerState(props, StepperItemCtx.get());
}

export function useStepperSeparator() {
	return new StepperSeparatorState(StepperItemCtx.get());
}

export function useStepperStepButton(props: StepperStepButtonProps) {
	return new StepperStepButtonState(props, StepperCtx.get());
}
