import { Context } from 'runed';
import { untrack } from 'svelte';
import {
	attachRef,
	type ReadableBoxedValues,
	type WithRefProps,
	type WritableBoxedValues
} from 'svelte-toolbelt';

const EDITING_ATTRIBUTE = 'data-editing';

type ContentEditableRootProps = WithRefProps &
	WritableBoxedValues<{
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
		this.onfocus = this.onfocus.bind(this);
		this.onblur = this.onblur.bind(this);
		this.oninput = this.oninput.bind(this);
		this.onkeydown = this.onkeydown.bind(this);

		$effect(() => {
			if (this.opts.ref.current !== null) {
				untrack(() => {
					const value = this.opts.ref.current?.innerText ?? '';
					this.opts.value.current = value;
				});
			}
		});
	}

	endEdit(commit = false) {
		this.opts.ref.current?.blur();

		if (!commit) {
			this.opts.value.current = this.ogValue;
			if (this.opts.ref.current !== null) this.opts.ref.current.innerText = this.ogValue;
			return;
		}

		if (this.opts.ref.current !== null) this.opts.ref.current.innerText = this.opts.value.current;
		this.opts.onValueCommit.current(this.opts.value.current);
	}

	startEdit() {
		this.ogValue = this.opts.value.current;
		this.opts.editing.current = true;
		this.opts.onEditingChange.current(true);
	}

	onfocus(_e: FocusEvent) {
		this.startEdit();
	}

	onblur(_e: FocusEvent) {
		this.opts.editing.current = false;
		this.opts.onEditingChange.current(false);
	}

	oninput(e: InputEvent) {
		const value = (e.target as HTMLElement)?.innerText;
		this.opts.value.current = value;
		this.opts.onValueChange.current(value);
	}

	onkeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'Enter':
				e.preventDefault();
				this.endEdit(true);
				break;
			case 'Escape':
				this.endEdit(false);
				break;
		}
	}

	props = $derived.by(() => ({
		onfocus: this.onfocus,
		onblur: this.onblur,
		oninput: this.oninput,
		onkeydown: this.onkeydown,
		[EDITING_ATTRIBUTE]: this.opts.editing.current ? '' : undefined,
		...attachRef(this.opts.ref)
	}));
}

const ctx = new Context<ContentEditableRootState>('content-editable-root');

export function useContentEditable(props: ContentEditableRootProps) {
	return ctx.set(new ContentEditableRootState(props));
}
