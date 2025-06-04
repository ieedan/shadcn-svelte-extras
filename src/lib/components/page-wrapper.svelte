<script lang="ts">
	import type { Route } from '$lib/map';
	import type { Snippet as SnippetType } from 'svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { ArrowLeftIcon, ArrowRightIcon, CodeIcon } from '@lucide/svelte';
	import * as Navigation from '$lib/components/ui/prev-next';
	import { UseToc } from '$lib/hooks/use-toc.svelte';
	import * as Toc from '$lib/components/ui/toc';
	import Button from './ui/button/button.svelte';
	import * as Tooltip from './ui/tooltip';

	type Props = {
		doc: { group: string; doc: Route; next?: Route; prev?: Route } | undefined;
		children: SnippetType;
	};

	let { children, doc }: Props = $props();

	const toc = new UseToc();
</script>

<div
	class="relative flex w-full justify-center gap-4 px-6 py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]"
>
	<div class="mx-auto w-full max-w-2xl min-w-0" style="min-height: calc(100svh - 112px);">
		<div class="flex flex-col gap-5">
			{#if doc}
				<div class="flex flex-col gap-1">
					<div class="flex items-center justify-between gap-2">
						<h1 class="text-4xl font-bold">
							{doc.doc.name}
						</h1>
						<div class="flex items-center gap-2">
							{#if doc.prev}
								<Tooltip.Root>
									<Tooltip.Trigger>
										{#snippet child({ props })}
											<Button
												{...props}
												variant="secondary"
												size="icon"
												class="size-8"
												href={doc.prev?.href}
												data-umami-event="Navigate backward arrow"
											>
												<ArrowLeftIcon class="size-4" />
											</Button>
										{/snippet}
									</Tooltip.Trigger>
									<Tooltip.Content>
										{doc.prev.name}
									</Tooltip.Content>
								</Tooltip.Root>
							{/if}
							{#if doc.next}
								<Tooltip.Root>
									<Tooltip.Trigger>
										{#snippet child({ props })}
											<Button
												{...props}
												variant="secondary"
												size="icon"
												class="size-8"
												href={doc.next?.href}
												data-umami-event="Navigate forward arrow"
											>
												<ArrowRightIcon class="size-4" />
											</Button>
										{/snippet}
									</Tooltip.Trigger>
									<Tooltip.Content>
										{doc.next.name}
									</Tooltip.Content>
								</Tooltip.Root>
							{/if}
						</div>
					</div>
					<p class="!text-muted-foreground text-lg">
						{doc.doc.description}
					</p>
					{#if doc.doc.source}
						<Badge
							href={new URL(
								doc.doc.source,
								'https://github.com/ieedan/shadcn-svelte-extras/tree/main/'
							).toString()}
							variant="secondary"
							target="_blank"
							class="flex w-fit place-items-center gap-1 rounded-md"
						>
							<span class="font-semibold">Component Source</span>
							<CodeIcon class="size-3.5" />
						</Badge>
					{/if}
				</div>
			{/if}
			<div bind:this={toc.ref} style="display: contents;" class="page-wrapper">
				{@render children()}
			</div>
		</div>
		<Navigation.Root class="pt-10">
			{#snippet previous()}
				{#if doc?.prev}
					<Navigation.Previous href={doc.prev.href}>
						{doc.prev.name}
					</Navigation.Previous>
				{/if}
			{/snippet}
			{#snippet next()}
				{#if doc?.next}
					<Navigation.Next href={doc.next.href}>
						{doc.next.name}
					</Navigation.Next>
				{/if}
			{/snippet}
		</Navigation.Root>
	</div>
	<div class="hidden xl:block">
		<div class="sticky top-20 -mt-6 h-[calc(100vh-7rem)] pt-4">
			<div class="no-scrollbar h-full overflow-auto pb-10">
				<div class="space-y-2">
					<span class="text-foreground text-sm font-medium">On This Page</span>
					<Toc.Root toc={toc.current} />
				</div>
			</div>
		</div>
	</div>
</div>
