<script lang="ts">
	import Logo from './logo.svelte';
	import { LightSwitch } from './ui/light-switch';
	import LayoutToggle from './layout-toggle.svelte';
	import { Separator } from './ui/separator';
	import MobileSheet from './mobile-sheet.svelte';
	import { GitHubButton, getStars } from './ui/github-button';
	import { onMount } from 'svelte';

	const STARS_FALLBACK = 525;

	let stars = $state(STARS_FALLBACK);

	const repo = { owner: 'ieedan', repo: 'shadcn-svelte-extras' };

	onMount(async () => {
		stars = await getStars({ ...repo, fallback: STARS_FALLBACK });
	});
</script>

<header class="bg-background sticky top-0 z-10 flex flex-col items-center">
	<div class="site-container flex h-(--header-height) w-full items-center justify-between">
		<MobileSheet />
		<div class="hidden items-center md:flex">
			<a href="/">
				<Logo class="mr-2 size-6" />
			</a>
			{@render HeaderLink({ href: '/docs', name: 'Docs' })}
			{@render HeaderLink({ href: '/components', name: 'Components' })}
			{@render HeaderLink({ href: '/hooks', name: 'Hooks' })}
			{@render HeaderLink({ href: '/actions', name: 'Actions' })}
		</div>
		<div class="flex items-center gap-2 **:data-[slot=separator]:h-4!">
			<GitHubButton variant="ghost" size="sm" {repo} {stars} />
			<Separator orientation="vertical" />
			<LayoutToggle class="hidden xl:flex" />
			<Separator orientation="vertical" class="hidden xl:block" />
			<LightSwitch variant="ghost" size="sm" />
		</div>
	</div>
</header>

{#snippet HeaderLink({ href, name }: { href: string; name: string })}
	<a
		{href}
		class="hover:bg-secondary flex h-7 items-center justify-center rounded-md px-2.5 text-sm transition-all"
	>
		{name}
	</a>
{/snippet}
