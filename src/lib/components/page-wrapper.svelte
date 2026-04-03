<script lang="ts">
	import type { Snippet as SnippetType } from 'svelte';
	import { Badge } from '$lib/components/ui/badge';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import CodeIcon from '@lucide/svelte/icons/code';
	import * as Navigation from '$lib/components/ui/prev-next';
	import { UseToc } from '$lib/hooks/use-toc.svelte';
	import * as Toc from '$lib/components/ui/toc';
	import Button from '$lib/components/button.svelte';
	import * as Tooltip from './ui/tooltip';
	import CarbonAds from './carbon-ads.svelte';
	import CopyMarkdownButton from './copy-markdown-button.svelte';
	import { useDocs } from '$lib/features/docs/docs-context.svelte';

	type Props = {
		children: SnippetType;
	};

	let { children }: Props = $props();

	const toc = new UseToc();

	const docsState = useDocs();
</script>

<div
	class="relative flex w-full justify-center gap-4 px-6 py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"
>
	<div
		class="mx-auto w-full max-w-4xl min-w-0"
		style="min-height: calc(100svh - var(--header-height) - 4rem);"
	>
		<div class="flex flex-col">
			<div class="mb-5 flex flex-col gap-1">
				<div class="flex items-center justify-between gap-2">
					<h1 class="text-4xl font-bold">
						{docsState.doc.doc.title}
					</h1>
					<div class="hidden items-center gap-2 md:flex">
						<CopyMarkdownButton />
						{#if docsState.doc.prev}
							<Tooltip.Root>
								<Tooltip.Trigger>
									{#snippet child({ props })}
										<Button
											{...props}
											variant="secondary"
											size="icon"
											class="size-8"
											href={docsState.doc.prev?.href}
											data-umami-event="Navigate backward arrow"
										>
											<ArrowLeftIcon class="size-4" />
										</Button>
									{/snippet}
								</Tooltip.Trigger>
								<Tooltip.Content>
									{docsState.doc.prev.title}
								</Tooltip.Content>
							</Tooltip.Root>
						{/if}
						{#if docsState.doc.next}
							<Tooltip.Root>
								<Tooltip.Trigger>
									{#snippet child({ props })}
										<Button
											{...props}
											variant="secondary"
											size="icon"
											class="size-8"
											href={docsState.doc.next?.href}
											data-umami-event="Navigate forward arrow"
										>
											<ArrowRightIcon class="size-4" />
										</Button>
									{/snippet}
								</Tooltip.Trigger>
								<Tooltip.Content>
									{docsState.doc.next.title}
								</Tooltip.Content>
							</Tooltip.Root>
						{/if}
					</div>
				</div>
				<p class="text-muted-foreground! text-lg">
					{docsState.doc.doc.description}
				</p>
				<div class="flex flex-wrap place-items-center gap-1">
					{#if docsState.doc.doc.links?.source}
						<Badge
							href={docsState.doc.doc.links?.source}
							variant="secondary"
							target="_blank"
							class="flex w-fit place-items-center gap-1 rounded-md"
						>
							<span class="font-semibold">Component Source</span>
							<CodeIcon class="size-3.5" />
						</Badge>
					{/if}
				</div>
			</div>
			<div bind:this={toc.ref} style="display: contents;" class="page-wrapper">
				{@render children()}
			</div>
		</div>
		<Navigation.Root class="pt-10">
			{#snippet previous()}
				{#if docsState.doc.prev}
					<Navigation.Previous href={docsState.doc.prev.href}>
						{docsState.doc.prev.title}
					</Navigation.Previous>
				{/if}
			{/snippet}
			{#snippet next()}
				{#if docsState.doc.next}
					<Navigation.Next href={docsState.doc.next.href}>
						{docsState.doc.next.title}
					</Navigation.Next>
				{/if}
			{/snippet}
		</Navigation.Root>
	</div>
	<div class="hidden xl:block">
		<div
			class="sticky top-[calc(var(--header-height)+2rem)] h-[calc(100vh-var(--header-height)-4rem)]"
		>
			<div class="no-scrollbar h-full pb-10">
				<div class="space-y-2">
					<span class="text-foreground text-sm font-medium">On This Page</span>
					<Toc.Root toc={toc.current} />
					<CarbonAds />
				</div>
			</div>
		</div>
	</div>
</div>
