<script lang="ts">
	import '@fontsource/geist-mono';
	import '@fontsource-variable/inter';
	import { ModeWatcher } from 'mode-watcher';
	import { UmamiAnalytics } from '@lukulent/svelte-umami';
	import '../app.css';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { map, type Route } from '$lib/map';
	import { page } from '$app/state';
	import { checkIsActive } from '$lib/actions/active.svelte';
	import PageWrapper from '$lib/components/page-wrapper.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Icons from '$lib/components/icons';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { commandContext } from '$lib/context';
	import { shortcut } from '$lib/actions/shortcut.svelte';
	import { Command } from '$lib/components/docs/command';
	import SearchButton from '$lib/components/search-button.svelte';
	import { LightSwitch } from '$lib/components/ui/light-switch';
	import { dev } from '$app/environment';
	import { UseBoolean } from '$lib/hooks/use-boolean.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import { cn } from '$lib/utils/utils';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';
	import { Code } from '$lib/components/ui/code';
	import * as Tabs from '$lib/components/ui/tabs';
	import { CodeSpan } from '$lib/components/docs';

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

	const isMobile = new IsMobile();
</script>

<svelte:window
	use:shortcut={{
		ctrl: true,
		key: 'k',
		callback: commandState.setTrue
	}}
/>

<!-- only inject analytics in production -->
{#if !dev}
	<UmamiAnalytics
		srcURL="https://cloud.umami.is/script.js"
		websiteID="07b288db-9239-4fbf-9d68-4f2ca9b63f89"
	/>
{/if}
<ModeWatcher />
<Toaster />
<Command />
<Sidebar.Provider>
	<AppSidebar />
	<!-- Do NOT ask me why this is here it makes it work that's what matters -->
	<Sidebar.Inset class="w-[200px]">
		<header
			class="border-border bg-background sticky top-0 z-20 flex h-16 place-items-center justify-between border-b pr-6 pl-2"
		>
			<div class="flex place-items-center gap-2">
				<Sidebar.Trigger class="md:hidden" />
				<SearchButton class="w-[200px] transition-all sm:w-[250px]" />
			</div>
			<div class="flex place-items-center gap-1">
				{#if !isMobile.current}
					<Dialog.Root>
						<!-- I just want to gauge interest here -->
						<Dialog.Trigger
							class={cn(buttonVariants({ variant: 'ghost' }), 'font-normal')}
							data-umami-event="MCP button"
						>
							<Icons.MCP class="size-4" /> MCP
						</Dialog.Trigger>
						<Dialog.Content class="sm:max-w-2xl">
							<Dialog.Title>Setup MCP</Dialog.Title>
							<Dialog.Description
								>Use the code below to setup MCP in your project.</Dialog.Description
							>
							<Tabs.Root value="cursor">
								<Tabs.List>
									<Tabs.Trigger value="cursor">Cursor</Tabs.Trigger>
									<Tabs.Trigger value="windsurf">Windsurf</Tabs.Trigger>
								</Tabs.List>
								<Tabs.Content value="cursor">
									Add the following code to your <CodeSpan>.cursor/mcp.json</CodeSpan> file.
								</Tabs.Content>
								<Tabs.Content value="windsurf">
									Add the following code to your <CodeSpan
										>.codeium/windsurf/mcp_config.json</CodeSpan
									> file.
								</Tabs.Content>
							</Tabs.Root>
							<div>
								<Code
									lang="json"
									code={`{
  "mcpServers": {
    "jsrepo": {
      "command": "npx",
      "args": ["jsrepo", "mcp"]
    }
  }
}`}
								/>
							</div>
						</Dialog.Content>
					</Dialog.Root>
				{/if}
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
