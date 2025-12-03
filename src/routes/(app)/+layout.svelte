<script lang="ts">
	import '@fontsource-variable/geist-mono';
	import '@fontsource-variable/geist';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { map, type Route } from '$lib/map';
	import { page } from '$app/state';
	import { checkIsActive } from '$lib/actions/active.svelte';
	import PageWrapper from '$lib/components/page-wrapper.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Icons from '$lib/components/icons';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { commandContext } from '$lib/context';
	import { shortcut } from '$lib/actions/shortcut.svelte';
	import { Command } from '$lib/components/docs/command';
	import SearchButton from '$lib/components/search-button.svelte';
	import { LightSwitch } from '$lib/components/ui/light-switch';
	import { UseBoolean } from '$lib/hooks/use-boolean.svelte';
	import { MetaTags } from '$lib/components/site/meta-tags';
	import { dev } from '$app/environment';
	import { UmamiAnalytics } from '@lukulent/svelte-umami';

	let { children } = $props();

	const commandState = commandContext.set(new UseBoolean(false));

	const getCurrentDoc = (
		url: URL
	): { group: string; doc: Route; next?: Route; prev?: Route } | undefined => {
		const docs = Object.entries(map).flatMap(([group, routes]) =>
			routes.map((r) => ({ group, ...r }))
		);

		for (let i = 0; i < docs.length; i++) {
			const doc = docs[i];

			const isActive = checkIsActive(new URL(doc.href, url.origin).toString(), {
				activeForSubdirectories: false,
				url
			});

			if (isActive) return { group: doc.group, doc: doc, prev: docs[i - 1], next: docs[i + 1] };
		}
	};

	const currentDoc = $derived(getCurrentDoc(page.url));

	const components = $derived(
		Array.from(Object.entries(map))
			.filter(([cat]) => cat === 'Components')
			.flatMap(([_, components]) =>
				components.map((comp, i) => `${i === components.length - 1 ? 'and ' : ''}${comp.name}`)
			)
			.join(', ')
	);
</script>

<MetaTags
	title={currentDoc ? `${currentDoc.doc.name} - shadcn-svelte-extras` : 'shadcn-svelte-extras'}
	description={currentDoc?.doc.name === 'Introduction'
		? `Finish your app with awesome svelte components like ${components}`
		: currentDoc?.doc.description}
	keywords={[
		'shadcn-svelte',
		'extras',
		'svelte',
		'components',
		'cli',
		'jsrepo',
		'mcp',
		'phone-input',
		'tags-input',
		'star-rating',
		'file-drop-zone'
	]}
	twitter={{
		cardType: 'summary_large_image',
		title: `${currentDoc?.doc.name} - shadcn-svelte-extras`,
		description:
			currentDoc?.doc.name === 'Introduction'
				? `Finish your app with awesome svelte components like ${components}`
				: currentDoc?.doc.description,
		image: 'https://shadcn-svelte-extras.com/og.png',
		creator: '@ieeeedan'
	}}
	openGraph={{
		url: page.url.toString(),
		type: 'website',
		title: `${currentDoc?.doc.name} - shadcn-svelte-extras`,
		description:
			currentDoc?.doc.name === 'Introduction'
				? `Finish your app with awesome svelte components like ${components}`
				: currentDoc?.doc.description,
		siteName: 'shadcn-svelte-extras',
		images: [
			{
				url: 'https://shadcn-svelte-extras.com/og.png',
				width: 2014,
				height: 1143,
				alt: 'shadcn-svelte-extras - Finish your app.'
			}
		]
	}}
/>

<svelte:window
	use:shortcut={{
		ctrl: true,
		key: 'k',
		callback: commandState.setTrue
	}}
/>

<!-- only inject analytics in production (intentionally placed here so we don't count demo views) -->
{#if !dev}
	<UmamiAnalytics
		srcURL="https://cloud.umami.is/script.js"
		websiteID="07b288db-9239-4fbf-9d68-4f2ca9b63f89"
	/>
{/if}

<Toaster />
<Command />
<Sidebar.Provider>
	<AppSidebar />
	<!-- Do NOT ask me why this is here it makes it work that's what matters -->
	<Sidebar.Inset class="page-wrapper w-[200px]">
		<header
			class="border-border bg-background sticky top-0 z-40 flex h-16 place-items-center justify-between border-b pr-6 pl-2"
		>
			<div class="flex place-items-center gap-2">
				<Sidebar.Trigger class="md:hidden" />
				<SearchButton class="w-[200px] transition-all sm:w-[250px]" />
			</div>
			<div class="flex place-items-center gap-1">
				<Button
					variant="ghost"
					size="icon"
					href="https://github.com/ieedan/shadcn-svelte-extras"
					target="_blank"
				>
					<Icons.GitHub class="size-4" />
				</Button>
				<LightSwitch variant="ghost" />
			</div>
		</header>
		{#if page.url.pathname !== '/'}
			<PageWrapper doc={currentDoc}>
				{@render children()}
			</PageWrapper>
		{:else}
			{@render children()}
		{/if}
	</Sidebar.Inset>
</Sidebar.Provider>
