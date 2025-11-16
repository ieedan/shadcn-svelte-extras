<script lang="ts">
	import '@fontsource-variable/geist-mono';
	import '@fontsource-variable/geist';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { page } from '$app/state';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { MetaTags } from '$lib/components/site/meta-tags';
	import * as Add from '$lib/components/ui/add';
	import { REGISTRY_OPTIONS } from '$lib/constants';

	let { children } = $props();
</script>

<MetaTags
	title={'shadcn-svelte-extras'}
	description={'Finish your app with awesome svelte components'}
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
		title: `shadcn-svelte-extras`,
		description: 'Finish your app with awesome svelte components',
		image: 'https://shadcn-svelte-extras.com/og.png',
		creator: '@ieeeedan'
	}}
	openGraph={{
		url: page.url.toString(),
		type: 'website',
		title: `shadcn-svelte-extras`,
		description: 'Finish your app with awesome svelte components',
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

<ModeWatcher />
<Toaster />
<Add.Provider
	agent="pnpm"
	registryOptions={REGISTRY_OPTIONS}
	registry="@ieedan/shadcn-svelte-extras"
>
	{@render children()}
</Add.Provider>
