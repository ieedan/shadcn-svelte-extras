import type { Country, CountryCode } from 'svelte-tel-input/types';
import { hasFlag } from 'country-flag-icons';

let flagIcons: Record<CountryCode, string> | null = null;

export async function getFlag(country: Country | null): Promise<string | null> {
	if (!country) return null;

	if (!hasFlag(country.iso2)) return null;

	flagIcons ??= await import('country-flag-icons/string/3x2');

	return flagIcons[country.iso2] ?? null;
}
