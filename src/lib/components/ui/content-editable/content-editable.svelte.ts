import { Context } from 'runed';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';

type ContentEditableRootProps = WritableBoxedValues<{
	editing: boolean;
	value: string;
}> &
	ReadableBoxedValues<{
		onValueCommit: (value: string) => void;
		onValueChange: (value: string) => void;
		onEditingChange: (editing: boolean) => void;
	}>;

class ContentEditableRootState {
	ogValue = $state('');

	constructor(readonly opts: ContentEditableRootProps) {
		this.onclick = this.onclick.bind(this);
		this.onkeydown = this.onkeydown.bind(this);
	}

	endEdit() {
		this.opts.editing.current = false;
		this.opts.onEditingChange.current(false);
	}

	startEdit() {
		this.ogValue = this.opts.value.current;
		this.opts.editing.current = true;
		this.opts.onEditingChange.current(true);
	}

	onclick(_e: MouseEvent) {
		if (!this.opts.editing.current) {
			this.startEdit();
		}
	}

	onkeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			this.endEdit();
			this.opts.onValueCommit.current(this.opts.value.current);
		}

		if (e.key === 'Escape') {
			this.endEdit();
			this.opts.value.current = this.ogValue;
		}
	}

	props = $derived.by(() => ({
		onclick: this.onclick,
		onkeydown: this.onkeydown
	}));
}

const ctx = new Context<ContentEditableRootState>('content-editable-root');

export function useContentEditable(props: ContentEditableRootProps) {
	return ctx.set(new ContentEditableRootState(props));
}
