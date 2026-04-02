<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { page } from '$app/state';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { MetaTags, deepMerge } from 'svelte-meta-tags';
	import * as Add from '$lib/components/ui/add';
	import { REGISTRY_OPTIONS } from '$lib/constants';
	import { PersistedState } from 'runed';

	let { data, children } = $props();

	let metaTags = $derived(deepMerge(data.baseMetaTags, page.data.pageMetaTags ?? {}));

	const agent = new PersistedState<Add.Agent>('user-agent-preference', 'npm');
	const installer = new PersistedState<Add.Installer>('user-installer-preference', 'jsrepo');
	const registry = new PersistedState<(typeof REGISTRY_OPTIONS)[number]>(
		'user-registry-preference',
		'@ieedan/shadcn-svelte-extras'
	);
</script>

<MetaTags {...metaTags} />

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
