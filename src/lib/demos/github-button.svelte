<script lang="ts">
	import { onMount } from 'svelte';
	import { GitHubButton, getStars } from '$lib/components/ui/github-button';

	let stars = $state(500);

	const repo = { owner: 'ieedan', repo: 'shadcn-svelte-extras' };

	onMount(async () => {
		stars = await getStars({ ...repo, fallback: 500 });
	});
</script>

<GitHubButton {repo} {stars} />
