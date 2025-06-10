export async function load() {
	return {
		stars: getStars(),
		FALLBACK_STARS
	};
}

const FALLBACK_STARS = 170;

async function getStars() {
	try {
		const response = await fetch('https://ungh.cc/repos/ieedan/shadcn-svelte-extras');

		if (!response.ok) {
			return FALLBACK_STARS;
		}   

		const { repo } = await response.json();

		return repo.stars;
	} catch {
		return FALLBACK_STARS;
	}
}
