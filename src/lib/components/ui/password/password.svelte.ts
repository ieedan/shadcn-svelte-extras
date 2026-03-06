import { Context, watch } from 'runed';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';
import type { ZxcvbnResult } from '@zxcvbn-ts/core';

type ZxcvbnCoreModule = typeof import('@zxcvbn-ts/core');
type ZxcvbnRunner = ZxcvbnCoreModule['zxcvbn'];

let zxcvbnRunnerPromise: Promise<ZxcvbnRunner> | null = null;

const loadZxcvbnRunner = async (): Promise<ZxcvbnRunner> => {
	if (zxcvbnRunnerPromise) return zxcvbnRunnerPromise;

	return Promise.all([
		import('@zxcvbn-ts/core'),
		import('@zxcvbn-ts/language-common'),
		import('@zxcvbn-ts/language-en')
	])
		.then(([core, common, en]) => {
			core.zxcvbnOptions.setOptions({
				translations: en.translations,
				graphs: common.adjacencyGraphs,
				dictionary: {
					...common.dictionary,
					...en.dictionary
				}
			});

			return core.zxcvbn;
		})
		.catch((error: unknown) => {
			zxcvbnRunnerPromise = null;
			throw error;
		});
};

type PasswordRootStateProps = WritableBoxedValues<{
	hidden: boolean;
}> &
	ReadableBoxedValues<{
		minScore: number;
	}>;

type PasswordState = {
	value: string;
	copyMounted: boolean;
	toggleMounted: boolean;
	strengthMounted: boolean;
	tainted: boolean;
};

const defaultPasswordState: PasswordState = {
	value: '',
	copyMounted: false,
	toggleMounted: false,
	strengthMounted: false,
	tainted: false
};

class PasswordRootState {
	passwordState = $state(defaultPasswordState);
	strength = $state<ZxcvbnResult | undefined>(undefined);
	strengthLoading = $state(false);
	#requestId = 0;

	constructor(readonly opts: PasswordRootStateProps) {}

	resetStrength() {
		this.#requestId += 1;
		this.strength = undefined;
		this.strengthLoading = false;
	}

	async updateStrength() {
		const password = this.passwordState.value;
		if (!this.passwordState.strengthMounted || password.length === 0) {
			this.resetStrength();
			return;
		}

		const requestId = ++this.#requestId;
		this.strengthLoading = true;

		try {
			const zxcvbn = await loadZxcvbnRunner();
			const result = zxcvbn(password);
			if (requestId !== this.#requestId) return;

			this.strength = result;
		} catch {
			if (requestId !== this.#requestId) return;

			this.strength = undefined;
		} finally {
			if (requestId === this.#requestId) {
				this.strengthLoading = false;
			}
		}
	}
}

type PasswordInputStateProps = WritableBoxedValues<{
	value: string;
}> &
	ReadableBoxedValues<{
		ref: HTMLInputElement | null;
	}>;

class PasswordInputState {
	constructor(
		readonly root: PasswordRootState,
		readonly opts: PasswordInputStateProps
	) {
		watch(
			() => this.opts.value.current,
			() => {
				if (this.root.passwordState.value !== this.opts.value.current) {
					this.root.passwordState.tainted = true;
					this.root.passwordState.value = this.opts.value.current;
					this.root.updateStrength();
				}
			}
		);

		$effect(() => {
			if (!this.root.passwordState.strengthMounted) return;

			// if the password is empty, we let the `required` attribute handle the validation
			if (
				this.root.passwordState.value !== '' &&
				!this.root.strengthLoading &&
				(this.root.strength?.score ?? 0) < this.root.opts.minScore.current
			) {
				this.opts.ref.current?.setCustomValidity('Password is too weak');
			} else {
				this.opts.ref.current?.setCustomValidity('');
			}
		});
	}

	props = $derived.by(() => ({
		'aria-invalid':
			!this.root.strengthLoading &&
			(this.root.strength?.score ?? 0) < this.root.opts.minScore.current &&
			this.root.passwordState.tainted &&
			this.root.passwordState.strengthMounted
	}));
}

class PasswordToggleVisibilityState {
	constructor(readonly root: PasswordRootState) {
		this.root.passwordState.toggleMounted = true;

		// this way we go back to the correct padding when toggle is unmounted
		$effect(() => {
			return () => {
				this.root.passwordState.toggleMounted = false;
			};
		});
	}
}

class PasswordCopyState {
	constructor(readonly root: PasswordRootState) {
		this.root.passwordState.copyMounted = true;

		// this way we go back to the correct padding when copy is unmounted
		$effect(() => {
			return () => {
				this.root.passwordState.copyMounted = false;
			};
		});
	}
}

type PasswordStrengthStateProps = WritableBoxedValues<{
	strength: ZxcvbnResult | undefined;
}>;

class PasswordStrengthState {
	constructor(
		readonly root: PasswordRootState,
		readonly opts: PasswordStrengthStateProps
	) {
		this.root.passwordState.strengthMounted = true;
		this.root.updateStrength();

		$effect(() => {
			return () => {
				this.root.passwordState.strengthMounted = false;
				this.root.resetStrength();
			};
		});

		watch(
			() => this.root.strength,
			(strength) => {
				this.opts.strength.current = strength;
			}
		);
	}
}

const ctx = new Context<PasswordRootState>('password-root-state');

export function usePassword(props: PasswordRootStateProps) {
	return ctx.set(new PasswordRootState(props));
}

export function usePasswordInput(props: PasswordInputStateProps) {
	return new PasswordInputState(ctx.get(), props);
}

export function usePasswordToggleVisibility() {
	return new PasswordToggleVisibilityState(ctx.get());
}

export function usePasswordCopy() {
	return new PasswordCopyState(ctx.get());
}

export function usePasswordStrength(props: PasswordStrengthStateProps) {
	return new PasswordStrengthState(ctx.get(), props);
}
