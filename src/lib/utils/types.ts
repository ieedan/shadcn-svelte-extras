/*
	Installed from @ieedan/std
*/

/** Allows you to have autocomplete on a string while still accepting any string value.
 *
 * ## Usage
 * ```ts
 * type Fruits = LooseAutocomplete<'apple' | 'orange' | 'pear'>;
 *
 * // you will still get autocomplete here
 * let fruit: Fruits = 'apple'; // valid
 * fruit = 'banana'; // valid
 * ```
 */
export type LooseAutocomplete<T> = T | (string & {});

/** Flattens a complex object type down into a single object.
 * Super useful when using joins with `Omit` and other helpers without needing to reveal the base type.
 */
export type Prettify<T> = {
	[K in keyof T]: T[K];
} & {};

declare const brand: unique symbol;

/** Allows you to create a branded type.
 *
 * ## Usage
 * ```ts
 * type Milliseconds = Brand<number, 'milliseconds'>;
 * ```
 */
export type Brand<T, Brand extends string> = T & { [brand]: Brand };
