import { onMount } from 'svelte';
import { Context, watch } from 'runed';
import type { ReadableBoxedValues, WritableBoxedValues } from 'svelte-toolbelt';
import {
	CHANNELS,
	clamp,
	formatColor,
	getChannelValues,
	hasExplicitAlpha,
	hsvaToRgba,
	parseColor,
	setChannelValue,
	type ChannelFormat,
	type ColorFormat,
	type Hsva
} from './color.js';

const DEFAULT_COLOR: Hsva = { h: 0, s: 0, v: 0, a: 1 };
const KEYBOARD_STEP = 1;
const KEYBOARD_STEP_LARGE = 10;

type ColorPickerRootStateProps = WritableBoxedValues<{
	value: string;
	format: ColorFormat;
}> &
	ReadableBoxedValues<{
		disabled: boolean;
	}>;

class ColorPickerRootState {
	/** Only ever replaced (never mutated), so it doesn't need a deep proxy. */
	hsva = $state.raw<Hsva>(DEFAULT_COLOR);
	#lastEmitted: string | undefined;
	/** Mounted `AlphaInput`s. While there is one, `Input` leaves the alpha to it. */
	#alphaInputs = $state(0);

	constructor(readonly opts: ColorPickerRootStateProps) {
		// parse synchronously so server rendering shows the right color (effects don't run on the server)
		const initial = parseValue(this.opts.value.current);
		this.hsva = initial ?? DEFAULT_COLOR;
		this.#normalize(this.opts.value.current);

		watch(
			() => this.opts.value.current,
			(value) => {
				if (value === this.#lastEmitted) return;
				const parsed = parseValue(value);
				// an invalid value is replaced with the current color, so `value` and the picker agree
				if (parsed) this.hsva = keepHueAndSaturation(this.hsva, parsed);
				this.#normalize(value);
			},
			{ lazy: true }
		);

		watch(
			() => this.opts.format.current,
			() => this.#emit(),
			{ lazy: true }
		);
	}

	get disabled() {
		return this.opts.disabled.current;
	}

	get format() {
		return this.opts.format.current;
	}

	set format(format: ColorFormat) {
		if (this.disabled) return;
		this.opts.format.current = format;
	}

	get hasAlphaInput() {
		return this.#alphaInputs > 0;
	}

	/** Returns a cleanup function that unregisters the input. */
	registerAlphaInput() {
		this.#alphaInputs++;
		return () => {
			this.#alphaInputs--;
		};
	}

	/** The current color as a css `rgb()` string, useful for previews. */
	get rgb() {
		return formatColor(this.hsva, 'rgb');
	}

	/** The current color without transparency. */
	get opaqueRgb() {
		return formatColor({ ...this.hsva, a: 1 }, 'rgb');
	}

	/** The current hue at full saturation and brightness. */
	get hueColor() {
		return formatColor({ h: this.hsva.h, s: 100, v: 100, a: 1 }, 'rgb');
	}

	/** Hue rounded to the slider step (0-360). */
	get hue() {
		return Math.round(this.hsva.h);
	}

	/**
	 * Sliders snap their value to the step on mount, so only update when the value actually changed.
	 * Otherwise mounting a slider would rewrite the bound value (e.g. `#3b82f6` -> `#3b83f6`).
	 */
	set hue(h: number) {
		if (h === this.hue) return;
		this.update({ h });
	}

	/** Alpha as a percentage (0-100). */
	get alpha() {
		return Math.round(this.hsva.a * 100);
	}

	set alpha(a: number) {
		if (a === this.alpha) return;
		this.update({ a: a / 100 });
	}

	/**
	 * Sets the color from any supported color string.
	 * With `keepAlpha`, a string without an alpha (e.g. `#ff0000`) keeps the current alpha.
	 * Returns `false` if the string isn't a valid color or the picker is disabled.
	 */
	setColor(value: string, { keepAlpha = false }: { keepAlpha?: boolean } = {}): boolean {
		const parsed = parseColor(value);
		if (!parsed) return false;
		const next = keepAlpha && !hasExplicitAlpha(value) ? { ...parsed, a: this.hsva.a } : parsed;
		return this.update(keepHueAndSaturation(this.hsva, next));
	}

	/** Sets one channel of `format` (e.g. the green of rgb). */
	setChannel(format: ChannelFormat, index: number, value: number): boolean {
		if (value === getChannelValues(this.hsva, format)[index]) return false;
		const next = setChannelValue(this.hsva, format, index, value);
		// rgb drops the hue for greys, hsl and hsb keep it
		return this.update(format === 'rgb' ? keepHueAndSaturation(this.hsva, next) : next);
	}

	/** Returns `false` when the picker is disabled and nothing changed. */
	update(next: Partial<Hsva>): boolean {
		if (this.disabled) return false;
		this.hsva = { ...this.hsva, ...next };
		this.#emit();
		return true;
	}

	/** Re-emits values passed in another format (e.g. `rgb(...)` while `format` is `hex`). */
	#normalize(value: string) {
		if (formatColor(this.hsva, this.opts.format.current) !== value) this.#emit();
	}

	#emit() {
		const formatted = formatColor(this.hsva, this.opts.format.current);
		this.#lastEmitted = formatted;
		this.opts.value.current = formatted;
	}
}

function parseValue(value: string): Hsva | undefined {
	const parsed = parseColor(value);
	if (!parsed) {
		console.warn(
			`ColorPicker: "${value}" isn't a supported color, so it was replaced. Use a hex, rgb(), hsl() or hsb() value.`
		);
	}
	return parsed;
}

/**
 * Hue is undefined for greys, and saturation is undefined for black, so a parsed color would reset
 * them to 0. Keep the previous values so dragging to black or white doesn't make the hue jump to red.
 */
function keepHueAndSaturation(previous: Hsva, next: Hsva): Hsva {
	const rgba = hsvaToRgba(next);
	const isGrey =
		Math.round(rgba.r) === Math.round(rgba.g) && Math.round(rgba.g) === Math.round(rgba.b);
	if (next.v === 0) return { ...next, h: previous.h, s: previous.s };
	if (isGrey) return { ...next, h: previous.h };
	return next;
}

class ColorPickerAreaState {
	constructor(readonly root: ColorPickerRootState) {}

	get saturation() {
		return Math.round(this.root.hsva.s);
	}

	get brightness() {
		return Math.round(this.root.hsva.v);
	}

	#updateFromPointer(e: PointerEvent & { currentTarget: HTMLElement }) {
		const rect = e.currentTarget.getBoundingClientRect();
		const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
		const y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
		this.root.update({ s: x * 100, v: (1 - y) * 100 });
	}

	onpointerdown(e: PointerEvent & { currentTarget: HTMLElement }) {
		if (this.root.disabled || e.button !== 0) return;
		e.preventDefault();
		// focus the saturation input so the keyboard can take over
		e.currentTarget.querySelector('input')?.focus();
		e.currentTarget.setPointerCapture(e.pointerId);
		this.#updateFromPointer(e);
	}

	onpointermove(e: PointerEvent & { currentTarget: HTMLElement }) {
		if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
		this.#updateFromPointer(e);
	}

	onkeydown(e: KeyboardEvent) {
		const step = e.shiftKey ? KEYBOARD_STEP_LARGE : KEYBOARD_STEP;
		const { s, v } = this.root.hsva;

		const next: Record<string, Partial<Hsva>> = {
			ArrowLeft: { s: clamp(s - step, 0, 100) },
			ArrowRight: { s: clamp(s + step, 0, 100) },
			ArrowUp: { v: clamp(v + step, 0, 100) },
			ArrowDown: { v: clamp(v - step, 0, 100) },
			Home: { s: 0 },
			End: { s: 100 },
			PageUp: { v: clamp(v + KEYBOARD_STEP_LARGE, 0, 100) },
			PageDown: { v: clamp(v - KEYBOARD_STEP_LARGE, 0, 100) }
		};

		const update = next[e.key];
		if (!update) return;
		e.preventDefault();
		this.root.update(update);
	}

	/** For assistive tech that changes a range input without key events (e.g. swipes). */
	oninput(e: Event & { currentTarget: HTMLInputElement }, channel: 's' | 'v') {
		this.root.update({ [channel]: e.currentTarget.valueAsNumber });
	}
}

type DraftStateProps = {
	/** The committed value the draft follows. */
	value: () => string;
	/** Applies a committed draft. Invalid drafts are ignored and revert. */
	apply: (draft: string) => void;
};

/** A text draft that follows a value and only applies on Enter or blur. */
class ColorPickerDraftState {
	/** Follows the value, and is overwritten while the user types. */
	draft = $derived.by(() => this.opts.value());

	constructor(readonly opts: DraftStateProps) {}

	get #isDirty() {
		return this.draft !== this.opts.value();
	}

	#revert() {
		this.draft = this.opts.value();
	}

	oninput(e: Event & { currentTarget: HTMLInputElement }) {
		this.draft = e.currentTarget.value;
	}

	/** Applies the draft, then syncs back to the value (which reverts invalid drafts). */
	commit() {
		if (!this.#isDirty) return;
		this.opts.apply(this.draft);
		this.#revert();
	}

	onkeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			this.commit();
		} else if (e.key === 'Escape' && this.#isDirty) {
			// cancel the edit without also closing a surrounding popover
			e.preventDefault();
			e.stopPropagation();
			this.#revert();
		}
	}
}

type NumberInputStateProps = {
	get: () => number;
	set: (value: number) => void;
	max: () => number;
	suffix?: string;
};

/** A draft for a whole number between 0 and `max`. ArrowUp/ArrowDown step by 1 (Shift by 10). */
class ColorPickerNumberInputState extends ColorPickerDraftState {
	constructor(readonly number: NumberInputStateProps) {
		super({
			value: () => `${number.get()}${number.suffix ?? ''}`,
			apply: (draft) => {
				const value = parseFloat(draft);
				if (Number.isNaN(value)) return;
				number.set(Math.round(clamp(value, 0, number.max())));
			}
		});
	}

	onkeydown(e: KeyboardEvent) {
		const step = e.shiftKey ? KEYBOARD_STEP_LARGE : KEYBOARD_STEP;
		const delta = e.key === 'ArrowUp' ? step : e.key === 'ArrowDown' ? -step : 0;
		if (delta === 0) return super.onkeydown(e);
		e.preventDefault();
		this.number.set(clamp(this.number.get() + delta, 0, this.number.max()));
	}
}

const ColorPickerRootCtx = new Context<ColorPickerRootState>('color-picker-root');

export function useColorPickerRoot(props: ColorPickerRootStateProps) {
	return ColorPickerRootCtx.set(new ColorPickerRootState(props));
}

export function useColorPickerArea() {
	return new ColorPickerAreaState(ColorPickerRootCtx.get());
}

export function useColorPickerInput() {
	const root = ColorPickerRootCtx.get();
	return new ColorPickerDraftState({
		// an AlphaInput shows the alpha, so don't repeat it here
		value: () =>
			root.hasAlphaInput
				? formatColor({ ...root.hsva, a: 1 }, root.format)
				: root.opts.value.current,
		apply: (draft) => root.setColor(draft, { keepAlpha: root.hasAlphaInput })
	});
}

export function useColorPickerAlphaInput() {
	const root = ColorPickerRootCtx.get();
	// a sibling Input drops its alpha once this mounts (before paint, so it never flashes)
	onMount(() => root.registerAlphaInput());
	return new ColorPickerNumberInputState({
		get: () => root.alpha,
		set: (value) => (root.alpha = value),
		max: () => 100,
		suffix: '%'
	});
}

type ChannelInputProps = ReadableBoxedValues<{
	format: ChannelFormat;
	index: number;
}>;

export function useColorPickerChannelInput(props: ChannelInputProps) {
	const root = ColorPickerRootCtx.get();
	return new ColorPickerNumberInputState({
		get: () => getChannelValues(root.hsva, props.format.current)[props.index.current],
		set: (value) => root.setChannel(props.format.current, props.index.current, value),
		max: () => CHANNELS[props.format.current][props.index.current].max
	});
}

export type { ColorPickerDraftState };

export function useColorPickerRootCtx() {
	return ColorPickerRootCtx.get();
}
