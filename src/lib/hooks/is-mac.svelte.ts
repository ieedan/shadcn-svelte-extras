import { browser } from '$app/environment';

/** Attempts to determine if a user is on a Mac using `navigator.userAgent`. */
export class IsMac {
	readonly current = $derived(browser ? navigator.userAgent.includes('Mac') : false);
}
