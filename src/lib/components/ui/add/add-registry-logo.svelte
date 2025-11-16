<script lang="ts">
	import GithubLogo from '$lib/components/logos/github.svelte';
	import JsrepoLogo from '$lib/components/logos/jsrepo.svelte';
	import GitlabLogo from '$lib/components/logos/gitlab.svelte';
	import BitbucketLogo from '$lib/components/logos/bitbucket.svelte';
	import type { Component } from 'svelte';
	import AzureDevops from '$lib/components/logos/azure-devops.svelte';
	import ServerIcon from '@lucide/svelte/icons/server';
	import { cn } from '$lib/utils';

	type Props = {
		registry: string;
		class?: string;
		width?: number;
		height?: number;
		fallbackIcon?: Component<{ class?: string; width?: number; height?: number }>;
	};

	let {
		registry,
		class: className,
		fallbackIcon: FallbackIcon = ServerIcon,
		...rest
	}: Props = $props();

	const logos: { matches: (r: string) => boolean; logo: Component }[] = [
		{
			matches: (r: string) => r.startsWith('@'),
			logo: JsrepoLogo
		},
		{
			matches: (r: string) => r.startsWith('github') || r.startsWith('https://github.com/'),
			logo: GithubLogo
		},
		{
			matches: (r: string) => r.startsWith('gitlab') || r.startsWith('https://gitlab.com/'),
			logo: GitlabLogo
		},
		{
			matches: (r: string) => r.startsWith('bitbucket') || r.startsWith('https://bitbucket.org/'),
			logo: BitbucketLogo
		},
		{
			matches: (r: string) => r.startsWith('azure'),
			logo: AzureDevops
		}
	];

	const logo = $derived(logos.find((l) => l.matches(registry)));
</script>

{#if logo}
	<logo.logo class={className} {...rest} />
{:else}
	<FallbackIcon class={cn('text-muted-foreground', className)} {...rest} />
{/if}
