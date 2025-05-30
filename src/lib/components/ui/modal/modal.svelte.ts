import { Context } from 'runed';
import { MediaQuery } from 'svelte/reactivity';

class ModalRootState {
	#isDesktop = new MediaQuery('(min-width: 768px)');

	get view() {
		return this.#isDesktop.current ? 'desktop' : 'mobile';
	}
}

class ModalSubState {
	constructor(private root: ModalRootState) {}

	get view() {
		return this.root.view;
	}
}

const ctx = new Context<ModalRootState>('modal-root-state');

export function useModal() {
	return ctx.set(new ModalRootState());
}

export function useModalSub() {
	return new ModalSubState(ctx.get());
}
