<script lang="ts" generics="T">
	import type { Component, PropReference } from './api-reference';
	import * as Alert from '$lib/components/ui/alert';
	import { Link } from '$lib/components/ui/link';
	import { cn } from '$lib/utils/utils';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { InfoIcon } from '@lucide/svelte';
	import { highlighter } from '$lib/components/ui/code/shiki';
	import type { HighlighterCore } from 'shiki';
	import { onMount } from 'svelte';

	let { name, component }: { name: string; component: Component<T> } = $props();

	let hl = $state<HighlighterCore>();

	onMount(() => {
		highlighter.then((highlighter) => (hl = highlighter));
	});
</script>

<div class="flex flex-col gap-1">
	<span
		class="bg-secondary flex w-fit place-items-center rounded-md px-2 py-1 font-mono text-lg font-light"
	>
		<span>
			{name}{component.name ? '.' : ''}
		</span>
		<h3 id={component.name}>
			{component.name}
		</h3>
	</span>
	<p class="text-neutral-800 dark:text-neutral-300">{component.description}</p>
</div>
{#if component.forwardTo}
	<Alert.Root>
		<Alert.Title>
			Documentation for this component's props can be found at
			<Link href={component.forwardTo.href}>{component.forwardTo.name}</Link>
		</Alert.Title>
	</Alert.Root>
{:else if Object.entries(component.props).length > 0}
	<div class="border-border bg-card overflow-hidden rounded-lg border">
		<table class={cn('w-full', 'bg-card')}>
			<thead>
				<tr class="bg-muted border-border border-b">
					<th class="text-foreground px-4 py-2 text-left text-sm font-semibold">Prop</th>
					<th class="text-foreground px-4 py-2 text-left text-sm font-semibold">Type</th>
					<th class="text-foreground px-4 py-2 text-left text-sm font-semibold">Default</th>
				</tr>
			</thead>
			<tbody>
				{#each Object.entries(component.props) as [prop, value] (prop)}
					{@const propValue = value as PropReference}
					<tr class="bg-card border-border not-last:border-b">
						<td class="text-foreground px-4 py-2 align-top">
							<div class="flex place-items-center gap-2">
								<span
									class="bg-brand/25 text-brand rounded-md px-2 py-1 font-mono text-sm font-light"
								>
									{prop}{propValue.required ? '' : '?'}
								</span>
								{#if propValue.bindable}
									<span
										class="rounded-md bg-blue-500/50 px-2 py-1 font-mono text-xs font-light text-blue-600 dark:bg-blue-500/50 dark:text-blue-300"
									>
										$bindable
									</span>
								{/if}
							</div>
						</td>
						<td class="text-foreground flex place-items-center px-4 py-2 align-top whitespace-pre">
							<span
								class="bg-secondary text-foreground/75 rounded-md px-2 py-1 font-mono text-sm font-light"
							>
								{propValue.type}
							</span>
							{#if propValue.tooltip}
								{@const tooltipHighlighted = hl?.codeToHtml(propValue.tooltip ?? '', {
									lang: propValue.type === 'Snippet' ? 'svelte' : 'typescript',
									themes: {
										light: 'github-light-default',
										dark: 'github-dark-default'
									}
								})}
								<HoverCard.Root openDelay={50} closeDelay={0}>
									<HoverCard.Trigger
										class="text-muted-foreground inline-flex size-[26px] place-items-center justify-center"
									>
										<InfoIcon class="size-4" />
									</HoverCard.Trigger>
									<HoverCard.Content
										align="center"
										class="flex place-items-center justify-center p-0"
									>
										{@html tooltipHighlighted}
									</HoverCard.Content>
								</HoverCard.Root>
							{/if}
						</td>
						<td class="text-muted-foreground px-4 py-2 align-top">
							<span class="font-mono text-sm font-light">
								{propValue.defaultValue === undefined ? '-' : propValue.defaultValue}
							</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style>
	@reference '../../../../app.css';

	:global(html.dark .shiki, html.dark .shiki span) {
		color: var(--shiki-dark) !important;
		background-color: var(--color-popover) !important;
		/* Optional, if you also want font styles */
		font-style: var(--shiki-dark-font-style) !important;
		font-weight: var(--shiki-dark-font-weight) !important;
		text-decoration: var(--shiki-dark-text-decoration) !important;
	}
</style>
