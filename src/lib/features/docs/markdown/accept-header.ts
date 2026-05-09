/**
 * Accept header parsing for serving Markdown to LLM agents when they ask for it.
 *
 * Implements the content negotiation guidelines from https://acceptmarkdown.com:
 * when a client's Accept header prefers `text/markdown` (or `text/plain`) over
 * `text/html`, we serve the Markdown representation from the same URL.
 */

export type AcceptPreference = 'markdown' | 'html' | 'other';

type AcceptEntry = {
	type: string;
	subtype: string;
	q: number;
	specificity: number;
	index: number;
};

const MARKDOWN_TYPES = new Set(['text/markdown', 'text/x-markdown', 'text/plain']);
const HTML_TYPES = new Set(['text/html', 'application/xhtml+xml']);

function parseEntry(raw: string, index: number): AcceptEntry | null {
	const parts = raw.split(';').map((p) => p.trim());
	const [type] = parts;
	if (!type || !type.includes('/')) return null;

	const [mainType, subType] = type.toLowerCase().split('/', 2) as [string, string];

	let q = 1;
	for (let i = 1; i < parts.length; i++) {
		const [key, value] = parts[i].split('=', 2);
		if (key?.trim().toLowerCase() === 'q' && value) {
			const parsed = Number.parseFloat(value);
			if (!Number.isNaN(parsed)) q = parsed;
		}
	}

	const specificity = (mainType === '*' ? 0 : 1) + (subType === '*' ? 0 : 1);

	return { type: mainType, subtype: subType, q, specificity, index };
}

function matches(entry: AcceptEntry, mime: string): boolean {
	const [mainType, subType] = mime.toLowerCase().split('/', 2) as [string, string];
	const typeOk = entry.type === '*' || entry.type === mainType;
	const subTypeOk = entry.subtype === '*' || entry.subtype === subType;
	return typeOk && subTypeOk;
}

function bestMatch(entries: AcceptEntry[], candidates: Iterable<string>): AcceptEntry | null {
	let best: AcceptEntry | null = null;
	for (const mime of candidates) {
		for (const entry of entries) {
			if (entry.q === 0) continue;
			if (!matches(entry, mime)) continue;
			if (
				!best ||
				entry.q > best.q ||
				(entry.q === best.q && entry.specificity > best.specificity) ||
				(entry.q === best.q && entry.specificity === best.specificity && entry.index < best.index)
			) {
				best = entry;
			}
		}
	}
	return best;
}

/**
 * Parse an Accept header and decide whether the client prefers Markdown or HTML.
 *
 * Follows q-value ordering with ties broken by specificity, per
 * https://acceptmarkdown.com — a client that asks for `text/markdown` with the
 * same or higher q-value than `text/html` should receive Markdown. A wildcard
 * match (`* / *`) does not count as asking for Markdown; browsers that send
 * `Accept: * / *` still get HTML.
 */
export function preferredResponseFormat(accept: string | null | undefined): AcceptPreference {
	if (!accept) return 'html';

	const entries = accept
		.split(',')
		.map((raw, i) => parseEntry(raw, i))
		.filter((e): e is AcceptEntry => e !== null);

	if (entries.length === 0) return 'html';

	const markdownMatch = bestMatch(entries, MARKDOWN_TYPES);
	const htmlMatch = bestMatch(entries, HTML_TYPES);

	const explicitMarkdown = markdownMatch && markdownMatch.specificity === 2;
	if (!explicitMarkdown) {
		return htmlMatch ? 'html' : markdownMatch ? 'html' : 'other';
	}

	if (!htmlMatch) return 'markdown';
	if (markdownMatch.q > htmlMatch.q) return 'markdown';
	if (markdownMatch.q < htmlMatch.q) return 'html';
	return markdownMatch.specificity >= htmlMatch.specificity ? 'markdown' : 'html';
}

/**
 * Add `Accept` to an existing `Vary` header without duplicating it, so caches
 * serve the right representation for each client.
 */
export function mergeVaryAccept(existing: string | null | undefined): string {
	if (!existing) return 'Accept';
	const tokens = existing
		.split(',')
		.map((t) => t.trim())
		.filter(Boolean);
	if (tokens.some((t) => t.toLowerCase() === 'accept')) return existing;
	return [...tokens, 'Accept'].join(', ');
}
