import { tick, untrack } from 'svelte';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';

type RenameStateProps = WritableBoxedValues<{
	mode: 'edit' | 'view';
	value: string;
	inputRef: HTMLInputElement | null;
	textRef: HTMLElement | null;
}> &
	ReadableBoxedValues<{
		canFocus: boolean;
		blurBehavior: 'exit' | 'none';
	}> & {
		id: string;
		onSave?: (value: string) => Promise<boolean> | boolean;
		onCancel?: () => Promise<void> | void;
	};

class RenameState {
	mode = $state<'edit' | 'view'>('view');
	editingValue = $state('');

	constructor(readonly opts: RenameStateProps) {
		this.mode = this.opts.mode.current;
		this.editingValue = this.opts.value.current;

		// function bindings
		this.onInputKeydown = this.onInputKeydown.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		this.onTextFocus = this.onTextFocus.bind(this);

		// we do this so that we can detect changes to the mode from the outside
		// this allows consumers to start edit mode and ensures that the state if kept in sync
		$effect(() => {
			// eslint-disable-next-line @typescript-eslint/no-unused-expressions
			this.opts.mode.current;

			untrack(() => {
				if (this.mode !== this.opts.mode.current) {
					this.mode = this.opts.mode.current;

					if (this.mode === 'edit') {
						this.startEditing(this.opts.value.current.length);
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

	private async startEditing(selectionStart?: number) {
		this.mode = 'edit';
		this.editingValue = this.opts.value.current;
		await tick();
		this.opts.inputRef.current?.focus();
		if (selectionStart !== undefined) {
			this.opts.inputRef.current?.setSelectionRange(selectionStart, selectionStart);
		}
	}

	private async save() {
		await this.opts.onSave?.(this.editingValue);
		this.opts.value.current = this.editingValue;
		this.mode = 'view';
	}

	private cancel() {
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
		if (this.opts.blurBehavior.current === 'none') return;
		this.cancel();
	}

	async onTextFocus() {
		// wait for the selection to be updated
		await new Promise((res) => setTimeout(res, 0));
		const selected = window.getSelection();
		const focusOffset = selected?.focusOffset;
		await this.startEditing(focusOffset);
	}
}

export function useRename(opts: RenameStateProps) {
	return new RenameState(opts);
}
