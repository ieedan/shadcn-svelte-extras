export const REGISTRY_OPTIONS = ['@ieedan/shadcn-svelte-extras'] as const;

/** Public base URL for registry item JSON files (shadcn-svelte add). */
export const REGISTRY_ITEM_URL_BASE = 'https://www.shadcn-svelte-extras.com/r';

/** Canonical site origin for public doc/demo links (e.g. exported `.md`). */
export const DOC_SITE_ORIGIN = new URL(REGISTRY_ITEM_URL_BASE).origin;

/** Default branch for raw / blob links in exported documentation. */
export const GITHUB_DOC_BRANCH = 'main';

/** Base URL for file links in exported docs (`…/blob/{branch}`). */
export const GITHUB_DOC_BLOB_BASE = `https://github.com/ieedan/shadcn-svelte-extras/blob/${GITHUB_DOC_BRANCH}`;
