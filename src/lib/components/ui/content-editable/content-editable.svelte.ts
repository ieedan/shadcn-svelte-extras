import { Context } from 'runed';
import { untrack } from 'svelte';
import {
	attachRef,
	type ReadableBoxedValues,
	type WithRefProps,
	type WritableBoxedValues
} from 'svelte-toolbelt';

const EDITING_ATTRIBUTE = 'data-editing';

type ContentEditableRootProps = WritableBoxedValues<{
	editing: boolean;
	value: string;
}> &
	ReadableBoxedValues<{
		onValueCommit: (value: string) => void;
		onValueChange: (value: string) => void;
		onEditingChange: (editing: boolean) => void;
	}>;

type ContentEditableState = {
	ogValue: string;
	setInnerText: (text: string) => void;
};

class ContentEditableRootState {
	rootState: ContentEditableState = $state({
		ogValue: '',
		setInnerText: () => {}
	});

	constructor(readonly opts: ContentEditableRootProps) {}

	endEdit({ commit = false }: { commit?: boolean } = {}) {
		if (!this.opts.editing.current) return;
		this.opts.editing.current = false;

		if (!commit) {
			this.opts.value.current = this.rootState.ogValue;
			this.rootState.setInnerText(this.rootState.ogValue);
			return;
		}

		this.rootState.setInnerText(this.opts.value.current);
		this.opts.onValueCommit.current(this.opts.value.current);
		this.rootState.ogValue = this.opts.value.current;
	}

	startEdit() {
		if (this.opts.editing.current) return;
		this.rootState.ogValue = this.opts.value.current;
		this.opts.editing.current = true;
		this.opts.onEditingChange.current(true);
	}
}

type ContentEditableContentProps = WithRefProps;

class ContentEditableContentState {
	constructor(
		readonly root: ContentEditableRootState,
		readonly opts: ContentEditableContentProps
	) {
		this.oninput = this.oninput.bind(this);
		this.onkeydown = this.onkeydown.bind(this);

		this.root.rootState.setInnerText = (text: string) => {
			if (this.opts.ref.current !== null) this.opts.ref.current.innerText = text;
		};

		$effect(() => {
			if (this.opts.ref.current !== null) {
				untrack(() => {
					const value = this.opts.ref.current?.innerText ?? '';
					this.root.opts.value.current = value;
					this.root.rootState.ogValue = value;
				});
			}
		});
	}

	oninput(e: InputEvent) {
		const value = (e.target as HTMLElement)?.innerText;
		this.root.opts.value.current = value;
		this.root.opts.onValueChange.current(value);
	}

	onkeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'Enter':
				e.preventDefault();
				e.stopPropagation();
				this.root.endEdit({ commit: true });
				break;
			case 'Escape':
				e.preventDefault();
				e.stopPropagation();
				this.root.endEdit({ commit: false });
				break;
		}
	}

	props = $derived.by(() => ({
		oninput: this.oninput,
		onkeydown: this.onkeydown,
		contenteditable: this.root.opts.editing.current ? true : false,
		[EDITING_ATTRIBUTE]: this.root.opts.editing.current ? '' : undefined,
		...attachRef(this.opts.ref)
	}));
}

class ContentEditableTriggerState {
	constructor(readonly root: ContentEditableRootState) {}
}

class ContentEditableCancelState {
	constructor(readonly root: ContentEditableRootState) {}
}

const ctx = new Context<ContentEditableRootState>('content-editable-root');

export function useContentEditable(props: ContentEditableRootProps) {
	return ctx.set(new ContentEditableRootState(props));
}

export function useContentEditableContent(props: ContentEditableContentProps) {
	return new ContentEditableContentState(ctx.get(), props);
}

export function useContentEditableTrigger() {
	return new ContentEditableTriggerState(ctx.get());
}

export function useContentEditableCancel() {
	return new ContentEditableCancelState(ctx.get());
}
