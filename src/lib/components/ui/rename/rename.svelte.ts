import { tick } from 'svelte';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';

type RenameStateProps = WritableBoxedValues<{
	mode: 'edit' | 'view';
	value: string;
	inputRef: HTMLInputElement | null;
	textRef: HTMLElement | null;
}> &
	ReadableBoxedValues<{
		canFocus: boolean;
	}> & {
		id: string;
		onSave?: (value: string) => Promise<boolean> | boolean;
		onCancel?: () => Promise<void> | void;
	};

class RenameState {
	editingValue = $state('');

	constructor(readonly opts: RenameStateProps) {
		this.editingValue = this.opts.value.current;

		// function bindings
		this.onInputKeydown = this.onInputKeydown.bind(this);
		this.onInputBlur = this.onInputBlur.bind(this);
		this.onTextFocus = this.onTextFocus.bind(this);
	}

	private async startEditing(selectionStart?: number) {
		this.opts.mode.current = 'edit';
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
		this.opts.mode.current = 'view';
	}

	private cancel() {
		this.opts.mode.current = 'view';
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
