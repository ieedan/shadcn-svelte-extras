import { tick, untrack } from 'svelte';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';
import { Context } from 'runed';

class RenameProviderState {
	inputState = $state<RenameInputState | null>(null);
	constructor() {}

	/** Allows us to call functions on the input state from the provider */
	registerInputState(inputState: RenameInputState) {
		this.inputState = inputState;
	}
}

class RenameEditState {
	constructor(readonly providerState: RenameProviderState) {
		this.edit = this.edit.bind(this);
	}

	edit() {
		this.providerState.inputState?.startEditing();
	}
}

class RenameCancelState {
	constructor(readonly providerState: RenameProviderState) {
		this.cancel = this.cancel.bind(this);
	}

	cancel() {
		this.providerState.inputState?.cancel();
	}
}

class RenameSaveState {
	constructor(readonly providerState: RenameProviderState) {
		this.save = this.save.bind(this);
	}

	save() {
		this.providerState.inputState?.save();
	}
}

type RenameInputStateProps = WritableBoxedValues<{
	mode: 'edit' | 'view';
	value: string;
	inputRef: HTMLInputElement | null;
	textRef: HTMLElement | null;
}> &
	ReadableBoxedValues<{
		blurBehavior?: 'exit' | 'none';
		fallbackSelectionBehavior: 'start' | 'end' | 'all';
	}> & {
		id: string;
		onSave?: (value: string) => void;
		onCancel?: () => void;
		validate: (value: string) => boolean;
	};

class RenameInputState {
	mode = $state<'edit' | 'view'>('view');
	editingValue = $state('');
	invalid = $derived.by(() => !this.opts.validate(this.editingValue));

	get blurBehavior() {
		if (this.opts.blurBehavior !== undefined && this.opts.blurBehavior.current !== undefined)
			return this.opts.blurBehavior.current;
		// if the blur behavior is provided, use it
		// otherwise if the provider state is provided we assume that the user does not want to blur when the input loses focus
		return this.providerState ? 'none' : 'exit';
	}

	constructor(
		readonly opts: RenameInputStateProps,
		readonly providerState?: RenameProviderState
	) {
		this.mode = this.opts.mode.current;
		this.editingValue = this.opts.value.current;

		// function bindings
		this.onInputKeydown = this.onInputKeydown.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		this.onTextClick = this.onTextClick.bind(this);
		this.save = this.save.bind(this);
		this.cancel = this.cancel.bind(this);
		this.startEditing = this.startEditing.bind(this);

		this.providerState?.registerInputState(this);

		// we do this so that we can detect changes to the mode from the outside
		// this allows consumers to start edit mode and ensures that the state if kept in sync
		$effect(() => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			this.opts.mode.current;

			untrack(() => {
				if (this.mode !== this.opts.mode.current) {
					this.mode = this.opts.mode.current;

					if (this.mode === 'edit') {
						this.startEditing();
					} else {
						this.cancel();
					}
				}
			});
		});

		$effect(() => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			this.mode;

			untrack(() => {
				this.opts.mode.current = this.mode;
			});
		});
	}

	async startEditing(selection?: { start: number; end?: number }) {
		this.mode = 'edit';
		this.editingValue = this.opts.value.current;
		await tick();
		this.opts.inputRef.current?.focus();
		if (selection !== undefined) {
			this.opts.inputRef.current?.setSelectionRange(
				selection.start,
				selection.end ?? selection.start
			);
		} else {
			if (this.opts.fallbackSelectionBehavior.current === 'start') {
				this.opts.inputRef.current?.setSelectionRange(0, 0);
			} else if (this.opts.fallbackSelectionBehavior.current === 'end') {
				this.opts.inputRef.current?.setSelectionRange(
					this.editingValue.length,
					this.editingValue.length
				);
			} else if (this.opts.fallbackSelectionBehavior.current === 'all') {
				this.opts.inputRef.current?.setSelectionRange(0, this.editingValue.length);
			}
		}
	}

	async save() {
		if (this.invalid) return;
		await this.opts.onSave?.(this.editingValue);
		this.opts.value.current = this.editingValue;
		this.mode = 'view';
	}

	cancel() {
		this.mode = 'view';
		this.opts.onCancel?.();
		this.editingValue = this.opts.value.current;
	}

	async onInputKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			await this.save();
		}

		if (e.key === 'Escape') {
			this.cancel();
		}
	}

	onInputBlur() {
		if (this.blurBehavior === 'none') return;
		this.cancel();
	}

	async onTextClick() {
		// do nothing if the provider state is defined
		if (this.providerState !== undefined) return;
		await new Promise((res) => setTimeout(res, 0));
		// this is how we make sure the selection starts where the user clicked
		const selected = window.getSelection();
		const focusOffset = selected?.focusOffset;
		await this.startEditing(focusOffset ? { start: focusOffset } : undefined);
	}
}

const providerCtx = new Context<RenameProviderState>('rename-provider-state');

export function useRename() {
	return providerCtx.set(new RenameProviderState());
}

export function useRenameEdit() {
	return new RenameEditState(providerCtx.get());
}

export function useRenameCancel() {
	return new RenameCancelState(providerCtx.get());
}

export function useRenameSave() {
	return new RenameSaveState(providerCtx.get());
}

export function useRenameInput(opts: RenameInputStateProps) {
	return new RenameInputState(opts, providerCtx.getOr(undefined));
}
