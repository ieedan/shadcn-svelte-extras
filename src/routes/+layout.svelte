<script lang="ts">
	import '@fontsource/geist-mono';
	import '@fontsource-variable/inter';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { map, type Route } from '$lib/map';
	import { page } from '$app/stores';
	import { checkIsActive } from '$lib/actions/active.svelte';
	import { ShikiProvider } from '$lib/components/ui/code';
	import PageWrapper from '$lib/components/page-wrapper.svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Icons from '$lib/components/icons';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { commandContext } from '$lib/context';
	import { shortcut } from '$lib/actions/shortcut.svelte';
	import { Command } from '$lib/components/docs/command';
	import SearchButton from '$lib/components/search-button.svelte';
	import { LightSwitch } from '$lib/components/ui/light-switch';

	let { children } = $props();

	const commandState = commandContext.init(false);

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

	const currentDoc = $derived(getCurrentDoc($page.url));
</script>

<svelte:window
	use:shortcut={{
		ctrl: true,
		key: 'k',
		callback: () => {
			$commandState = true;
		}
	}}
/>

<ModeWatcher />
<Toaster />
<Command />
<ShikiProvider>
	<Sidebar.Provider>
		<AppSidebar />
		<!-- Do NOT ask me why this is here it makes it work that's what matters -->
		<Sidebar.Inset class="w-[200px]">
			<header class="flex h-16 place-items-center justify-between border-b border-border pl-2 pr-6">
				<div class="flex place-items-center gap-2">
					<Sidebar.Trigger class="md:hidden" />
					<SearchButton class="w-[200px] transition-all sm:w-[250px]" />
				</div>
				<div class="flex place-items-center gap-1">
					<Button variant="ghost" size="icon" href="https://github.com/ieedan/shadcn-svelte-extras">
						<Icons.GitHub class="size-4" />
					</Button>
					<LightSwitch variant="ghost" />
				</div>
			</header>
			<PageWrapper doc={currentDoc}>
				{@render children()}
			</PageWrapper>
		</Sidebar.Inset>
	</Sidebar.Provider>
</ShikiProvider>
