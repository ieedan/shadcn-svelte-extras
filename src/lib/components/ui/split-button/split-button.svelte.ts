import { Context } from 'runed';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';
import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

export type SplitButtonClickEvent = {
	action: string;
	originalEvent: MouseEvent & {
		currentTarget: EventTarget & (HTMLButtonElement | HTMLAnchorElement);
	};
};

type SplitButtonRootProps = WritableBoxedValues<{
	value: string | undefined;
}> &
	ReadableBoxedValues<{
		onclick: ((event: SplitButtonClickEvent) => void) | undefined;
		onActionSelect: ((value: string) => void) | undefined;
	}>;

class SplitButtonRootState {
	constructor(readonly opts: SplitButtonRootProps) {}

	seed(value: string) {
		if (this.opts.value.current === undefined) {
			this.opts.value.current = value;
		}
	}

	get action() {
		return this.opts.value.current ?? '';
	}

	set action(value: string) {
		this.opts.value.current = value;
	}

	onSelect(value: string) {
		this.opts.onActionSelect.current?.(value);
	}

	onclick(
		event: MouseEvent & {
			currentTarget: EventTarget & (HTMLButtonElement | HTMLAnchorElement);
		}
	) {
		const action = this.opts.value.current;
		if (action === undefined) return;
		this.opts.onclick.current?.({ action, originalEvent: event });
	}
}

type SplitButtonActionStateProps = ReadableBoxedValues<{
	value: string;
	onclick: HTMLButtonAttributes['onclick'] | HTMLAnchorAttributes['onclick'] | undefined;
}>;

class SplitButtonActionState {
	constructor(
		readonly opts: SplitButtonActionStateProps,
		readonly rootState: SplitButtonRootState
	) {
		this.rootState.seed(this.opts.value.current);
	}

	isActive = $derived.by(() => this.opts.value.current === this.rootState.opts.value.current);

	onclick(
		event: MouseEvent & {
			currentTarget: EventTarget & (HTMLButtonElement | HTMLAnchorElement);
		}
	) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.opts.onclick.current?.(event as any);
		this.rootState.onclick(event);
	}
}

type SplitButtonSelectActionStateProps = ReadableBoxedValues<{
	value: string;
}>;

class SplitButtonSelectActionState {
	constructor(
		readonly opts: SplitButtonSelectActionStateProps,
		readonly rootState: SplitButtonRootState
	) {
		this.rootState.seed(this.opts.value.current);
	}
}

const SplitButtonCtx = new Context<SplitButtonRootState>('split-button-root');

export function useSplitButtonRoot(props: SplitButtonRootProps) {
	return SplitButtonCtx.set(new SplitButtonRootState(props));
}

export function useSplitButtonAction(props: SplitButtonActionStateProps) {
	return new SplitButtonActionState(props, SplitButtonCtx.get());
}

export function useSplitButtonSelectAction(props: SplitButtonSelectActionStateProps) {
	return new SplitButtonSelectActionState(props, SplitButtonCtx.get());
}

export function useSplitButtonRootCtx() {
	return SplitButtonCtx.get();
}
