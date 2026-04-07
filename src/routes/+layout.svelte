<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { page } from '$app/state';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';
	import * as Add from '$lib/components/ui/add';
	import { PersistedState } from 'runed';
	import { dev } from '$app/environment';
	import { UmamiAnalytics } from '@lukulent/svelte-umami';
	import { UserConfig, UserConfigContext } from '$lib/user-config.svelte';

	const REGISTRY_OPTIONS = ['@ieedan/shadcn-svelte-extras'] as const;

	let { data, children } = $props();

	let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags ?? {}));

	const agent = new PersistedState<Add.Agent>('user-agent-preference', 'npm');
	const installer = new PersistedState<Add.Installer>('user-installer-preference', 'jsrepo');
	const registry = new PersistedState<(typeof REGISTRY_OPTIONS)[number]>(
		'user-registry-preference',
		'@ieedan/shadcn-svelte-extras'
	);

	// svelte-ignore state_referenced_locally
	UserConfigContext.set(new UserConfig(data.userConfig));
</script>

<MetaTags {...metaTags} />

<!-- only inject analytics in production (intentionally placed here so we don't count demo views) -->
{#if !dev}
	<UmamiAnalytics
		srcURL="https://cloud.umami.is/script.js"
		websiteID="07b288db-9239-4fbf-9d68-4f2ca9b63f89"
	/>
{/if}

<ModeWatcher />
<Toaster />
<Add.Provider
	bind:agent={agent.current}
	bind:installer={installer.current}
	bind:registry={registry.current}
	registryOptions={REGISTRY_OPTIONS}
>
	{@render children()}
</Add.Provider>
