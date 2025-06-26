import { MediaQuery } from 'svelte/reactivity';

export type Breakpoints<K extends string> = Record<K, { rem?: number; px: number }>;

/** Based on the default Tailwind CSS breakpoints https://tailwindcss.com/docs/responsive-design.
 * A breakpoint is `true` when the width of the screen is greater than or equal to the breakpoint. */
export const DEFAULT_BREAKPOINTS: Breakpoints<'sm' | 'md' | 'lg' | 'xl' | '2xl'> = {
	sm: {
		rem: 40,
		px: 640
	},
	md: {
		rem: 48,
		px: 768
	},
	lg: {
		rem: 64,
		px: 1024
	},
	xl: {
		rem: 80,
		px: 1280
	},
	'2xl': {
		rem: 96,
		px: 1536
	}
} as const;

/** Dynamically creates media queries for the provided breakpoints allowing you to access them as `media.<name>`.
 *
 * @param breakpoints
 * @returns
 */
export function useMedia<K extends string = keyof typeof DEFAULT_BREAKPOINTS>(
	breakpoints: Breakpoints<K> = DEFAULT_BREAKPOINTS as Breakpoints<K>
) {
	let queries: Record<K, boolean> = {} as never;

	for (const [name, s] of Object.entries(breakpoints)) {
		const size = s as Breakpoints<K>[K];

		const query = new MediaQuery(`min-width: ${size.rem ? `${size.rem}rem` : `${size.px}px`}`);

		queries = Object.defineProperty(queries, name, {
			get: () => query.current
		});
	}

	return queries;
}
