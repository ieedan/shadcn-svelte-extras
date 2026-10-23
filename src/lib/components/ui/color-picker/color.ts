export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'hsb';

/** h: 0-360, s: 0-100, v: 0-100, a: 0-1 */
export type Hsva = { h: number; s: number; v: number; a: number };

/** r, g, b: 0-255, a: 0-1 */
export type Rgba = { r: number; g: number; b: number; a: number };

/** h: 0-360, s: 0-100, l: 0-100, a: 0-1 */
export type Hsla = { h: number; s: number; l: number; a: number };

const HEX_REGEX = /^#?([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;
const RGB_REGEX =
	/^rgba?\(\s*(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)[\s,]+(\d+(?:\.\d+)?)(?:[\s,/]+(\d*\.?\d+%?))?\s*\)$/i;
/** `hsl()` and `hsb()` share a syntax: a hue (optionally in `deg`), two percentages and an alpha. */
function hueFunctionRegex(name: string) {
	return new RegExp(
		`^${name}a?\\(\\s*(\\d+(?:\\.\\d+)?)(?:deg)?[\\s,]+(\\d+(?:\\.\\d+)?)%?[\\s,]+(\\d+(?:\\.\\d+)?)%?(?:[\\s,/]+(\\d*\\.?\\d+%?))?\\s*\\)$`,
		'i'
	);
}
const HSL_REGEX = hueFunctionRegex('hsl');
const HSB_REGEX = hueFunctionRegex('hsb');

/** css background used behind transparent colors */
export const CHECKERBOARD = 'repeating-conic-gradient(#d4d4d4 0% 25%, #fff 0% 50%) 50% / 8px 8px';

export function clamp(value: number, min: number, max: number) {
	return Math.min(Math.max(value, min), max);
}

function round(value: number, precision = 0) {
	const factor = 10 ** precision;
	return Math.round(value * factor) / factor;
}

/** Whether the string spells out an alpha, e.g. `#ff0000ff` or `rgb(0 0 0 / 1)`. */
export function hasExplicitAlpha(value: string): boolean {
	const trimmed = value.trim();
	const hex = HEX_REGEX.exec(trimmed);
	if (hex) return hex[1].length === 4 || hex[1].length === 8;
	return [RGB_REGEX, HSL_REGEX, HSB_REGEX].some((regex) => regex.exec(trimmed)?.[4] !== undefined);
}

function parseAlpha(value: string | undefined) {
	if (value === undefined) return 1;
	const alpha = value.endsWith('%') ? parseFloat(value) / 100 : parseFloat(value);
	return clamp(alpha, 0, 1);
}

export function hsvaToRgba({ h, s, v, a }: Hsva): Rgba {
	const sat = s / 100;
	const val = v / 100;
	const f = (n: number) => {
		const k = (n + h / 60) % 6;
		return val - val * sat * Math.max(0, Math.min(k, 4 - k, 1));
	};
	return { r: f(5) * 255, g: f(3) * 255, b: f(1) * 255, a };
}

export function rgbaToHsva({ r, g, b, a }: Rgba): Hsva {
	const red = r / 255;
	const green = g / 255;
	const blue = b / 255;
	const max = Math.max(red, green, blue);
	const delta = max - Math.min(red, green, blue);

	let h = 0;
	if (delta !== 0) {
		if (max === red) h = ((green - blue) / delta) % 6;
		else if (max === green) h = (blue - red) / delta + 2;
		else h = (red - green) / delta + 4;
	}

	return {
		h: (h * 60 + 360) % 360,
		s: max === 0 ? 0 : (delta / max) * 100,
		v: max * 100,
		a
	};
}

export function hsvaToHsla({ h, s, v, a }: Hsva): Hsla {
	const sat = s / 100;
	const val = v / 100;
	const l = val * (1 - sat / 2);
	// saturation is undefined at black, so use its limit to keep it through hsl edits
	const sl = l === 0 ? sat / (2 - sat) : l === 1 ? 0 : (val - l) / Math.min(l, 1 - l);
	return { h, s: sl * 100, l: l * 100, a };
}

export function hslaToHsva({ h, s, l, a }: Hsla): Hsva {
	const sat = s / 100;
	const light = l / 100;
	const v = light + sat * Math.min(light, 1 - light);
	// the inverse of the black limit in `hsvaToHsla`
	const sv = v === 0 ? (2 * sat) / (1 + sat) : 2 * (1 - light / v);
	return { h, s: sv * 100, v: v * 100, a };
}

function parseHex(value: string): Rgba | undefined {
	const match = HEX_REGEX.exec(value.trim());
	if (!match) return undefined;

	let hex = match[1];
	if (hex.length <= 4) {
		hex = [...hex].map((char) => char + char).join('');
	}

	return {
		r: parseInt(hex.slice(0, 2), 16),
		g: parseInt(hex.slice(2, 4), 16),
		b: parseInt(hex.slice(4, 6), 16),
		a: hex.length === 8 ? parseInt(hex.slice(6, 8), 16) / 255 : 1
	};
}

function parseRgb(value: string): Rgba | undefined {
	const match = RGB_REGEX.exec(value.trim());
	if (!match) return undefined;

	return {
		r: clamp(parseFloat(match[1]), 0, 255),
		g: clamp(parseFloat(match[2]), 0, 255),
		b: clamp(parseFloat(match[3]), 0, 255),
		a: parseAlpha(match[4])
	};
}

function parseHsl(value: string): Hsla | undefined {
	const match = HSL_REGEX.exec(value.trim());
	if (!match) return undefined;

	return {
		h: parseFloat(match[1]) % 360,
		s: clamp(parseFloat(match[2]), 0, 100),
		l: clamp(parseFloat(match[3]), 0, 100),
		a: parseAlpha(match[4])
	};
}

/** hsb (hue, saturation, brightness) is the same model as hsv, so it maps straight to `Hsva`. */
function parseHsb(value: string): Hsva | undefined {
	const match = HSB_REGEX.exec(value.trim());
	if (!match) return undefined;

	return {
		h: parseFloat(match[1]) % 360,
		s: clamp(parseFloat(match[2]), 0, 100),
		v: clamp(parseFloat(match[3]), 0, 100),
		a: parseAlpha(match[4])
	};
}

/**
 * Parses a hex, rgb(a), hsl(a) or hsb(a) string.
 * Returns `undefined` when the string isn't a valid color.
 */
export function parseColor(value: string | undefined): Hsva | undefined {
	if (!value) return undefined;

	const rgba = parseHex(value) ?? parseRgb(value);
	if (rgba) return rgbaToHsva(rgba);

	const hsla = parseHsl(value);
	if (hsla) return hslaToHsva(hsla);

	return parseHsb(value);
}

/** Formats that are edited one channel at a time. */
export type ChannelFormat = Exclude<ColorFormat, 'hex'>;

export type ColorChannel =
	| 'red'
	| 'green'
	| 'blue'
	| 'hue'
	| 'saturation'
	| 'lightness'
	| 'brightness';

export const CHANNELS: Record<ChannelFormat, { name: ColorChannel; max: number }[]> = {
	rgb: [
		{ name: 'red', max: 255 },
		{ name: 'green', max: 255 },
		{ name: 'blue', max: 255 }
	],
	hsl: [
		{ name: 'hue', max: 360 },
		{ name: 'saturation', max: 100 },
		{ name: 'lightness', max: 100 }
	],
	hsb: [
		{ name: 'hue', max: 360 },
		{ name: 'saturation', max: 100 },
		{ name: 'brightness', max: 100 }
	]
};

/** The rounded channel values of `format`, in the same order as `CHANNELS[format]`. */
export function getChannelValues(hsva: Hsva, format: ChannelFormat): number[] {
	if (format === 'rgb') {
		const { r, g, b } = hsvaToRgba(hsva);
		return [r, g, b].map(Math.round);
	}
	if (format === 'hsl') {
		const { h, s, l } = hsvaToHsla(hsva);
		return [h, s, l].map(Math.round);
	}
	return [hsva.h, hsva.s, hsva.v].map(Math.round);
}

/** Returns a new color with one channel of `format` replaced. The other channels keep full precision. */
export function setChannelValue(
	hsva: Hsva,
	format: ChannelFormat,
	index: number,
	value: number
): Hsva {
	if (format === 'hsb') {
		const keys = ['h', 's', 'v'] as const;
		return { ...hsva, [keys[index]]: value };
	}
	if (format === 'hsl') {
		const keys = ['h', 's', 'l'] as const;
		return hslaToHsva({ ...hsvaToHsla(hsva), [keys[index]]: value });
	}
	const keys = ['r', 'g', 'b'] as const;
	return rgbaToHsva({ ...hsvaToRgba(hsva), [keys[index]]: value });
}

function toHexByte(value: number) {
	return Math.round(value).toString(16).padStart(2, '0');
}

export function formatColor(hsva: Hsva, format: ColorFormat): string {
	// compare the rounded alpha so values like 0.998 don't print a redundant alpha
	const alpha = round(hsva.a, 2);

	if (format === 'hsl') {
		const { h, s, l } = hsvaToHsla(hsva);
		const color = `${round(h)} ${round(s)}% ${round(l)}%`;
		return alpha < 1 ? `hsl(${color} / ${alpha})` : `hsl(${color})`;
	}

	if (format === 'hsb') {
		const color = `${round(hsva.h)} ${round(hsva.s)}% ${round(hsva.v)}%`;
		return alpha < 1 ? `hsb(${color} / ${alpha})` : `hsb(${color})`;
	}

	const { r, g, b } = hsvaToRgba(hsva);

	if (format === 'rgb') {
		const color = `${Math.round(r)} ${Math.round(g)} ${Math.round(b)}`;
		return alpha < 1 ? `rgb(${color} / ${alpha})` : `rgb(${color})`;
	}

	const hex = `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
	const alphaByte = toHexByte(hsva.a * 255);
	return alphaByte === 'ff' ? hex : `${hex}${alphaByte}`;
}
