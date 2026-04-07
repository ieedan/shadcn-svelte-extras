import { Context } from 'runed';
import type { ReadableBoxedValues } from 'svelte-toolbelt';

export type Timeout = ReturnType<typeof setTimeout> | undefined;

export type TerminalLoopProps = {
	onComplete: () => void;
};

export class TerminalLoop {
	constructor(readonly opts: TerminalLoopProps) {
		this.onComplete = this.onComplete.bind(this);
	}

	onComplete() {
		this.opts.onComplete();
	}
}

export type TerminalRootProps = ReadableBoxedValues<{
	delay: number;
	speed: number;
	onComplete: () => void;
}>;

export class TerminalSession {
	#animations: AnimationState[] = $state([]);
	#timeout: Timeout;

	constructor(
		readonly opts: TerminalRootProps,
		readonly loop?: TerminalLoop
	) {
		this.onComplete = this.onComplete.bind(this);
	}

	play() {
		this.#timeout = setTimeout(() => {
			this.#animations.sort((a, b) => a.opts.delay.current - b.opts.delay.current);

			for (let i = 0; i < this.#animations.length; i++) {
				this.#animations[i].timeout = setTimeout(() => {
					this.#animations[i].play(this.opts.speed.current);

					// when the most delayed animation is complete call onComplete
					if (i === this.#animations.length - 1) {
						this.#animations[i].onComplete = this.onComplete;
					}
				}, this.#animations[i].opts.delay.current);
			}
		}, this.opts.delay.current);
	}

	onComplete() {
		this.opts.onComplete.current?.();

		this.loop?.onComplete();
	}

	dispose() {
		clearTimeout(this.#timeout);
	}

	registerAnimation(animation: AnimationState) {
		this.#animations.push(animation);
	}
}

export type AnimationStateProps = ReadableBoxedValues<{
	delay: number;
}> & {
	play: (speed: number) => void;
};

export class AnimationState {
	timeout: Timeout;
	onComplete = $state<() => void>();

	constructor(
		readonly rootState: TerminalSession,
		readonly opts: AnimationStateProps
	) {
		rootState.registerAnimation(this);
	}

	play(speed: number) {
		this.opts.play(speed);
	}

	dispose() {
		clearTimeout(this.timeout);
	}
}

const TerminalLoopContext = new Context<TerminalLoop>('Terminal.Loop');
const TerminalRootContext = new Context<TerminalSession>('Terminal.Root');

export const useTerminalLoop = (props: TerminalLoopProps) => {
	return TerminalLoopContext.set(new TerminalLoop(props));
};

export const useTerminalRoot = (props: TerminalRootProps) => {
	return TerminalRootContext.set(new TerminalSession(props, TerminalLoopContext.getOr(undefined)));
};

export const useAnimation = (props: AnimationStateProps) => {
	return new AnimationState(TerminalRootContext.get(), props);
};
