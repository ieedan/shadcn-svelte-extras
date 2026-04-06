import Root from './github-button.svelte';

/**
 * Get the stars for a GitHub repository using the ungh.cc API.
 *
 * @example
 * ```ts
 * const stars = await getStars({ owner: 'ieedan', repo: 'shadcn-svelte-extras', fallback: 539 });
 * ```
 *
 * @param owner - The owner of the repository
 * @param repoName - The name of the repository
 * @param fallback - The fallback value to return if the request fails
 * @returns
 */
export async function getStars({
	owner,
	repo: repoName,
	fallback = 0
}: {
	owner: string;
	repo: string;
	fallback?: number;
}) {
	try {
		const response = await fetch(`https://ungh.cc/repos/${owner}/${repoName}`);
		if (!response.ok) return fallback;
		const { repo } = await response.json();
		return repo.stars;
	} catch {
		return fallback;
	}
}

export { Root as GitHubButton };
