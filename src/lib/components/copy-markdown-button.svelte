<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { buttonVariants } from '$lib/components/ui/button';
	import MessageCircleIcon from '@lucide/svelte/icons/message-circle';
	import { cn } from '$lib/utils';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { page } from '$app/state';
	import { useDocs } from '$lib/features/docs/docs-context.svelte';
	import type { Component } from 'svelte';
	import GithubLogo from '$lib/components/logos/github.svelte';
	import MarkdownLogo from '$lib/components/logos/markdown.svelte';
	import OpenaiLogo from '$lib/components/logos/openai.svelte';
	import AnthropicLogo from '$lib/components/logos/anthropic.svelte';
	import FinalchatLogo from '$lib/components/logos/finalchat.svelte';
	import LinkIcon from '@lucide/svelte/icons/link';
	import CheckIcon from '@lucide/svelte/icons/check';
	import { UseClipboard } from '$lib/hooks/use-clipboard.svelte';
	import { scale } from 'svelte/transition';

	type LinkItem = {
		title: string;
		href: string;
		icon: Component<{ class?: string }>;
	};

	const CONTENT_BASE_URL = 'https://github.com/ieedan/shadcn-svelte-extras/tree/main/content/';

	const docs = useDocs();

	const markdownViewHref = $derived(new URL(`/docs/${docs.doc.doc.slug}.md`, page.url.origin).href);

	const shareQuery = $derived(`Read ${markdownViewHref} I want to ask questions about it.`);

	const source = $derived(`${CONTENT_BASE_URL.replace(/\/$/, '')}/${docs.doc.doc.path}.md`);

	const chatItems: LinkItem[] = $derived([
		{
			title: 'Open in ChatGPT',
			href: `https://chatgpt.com/?${new URLSearchParams({ hints: 'search', q: shareQuery })}`,
			icon: OpenaiLogo
		},
		{
			title: 'Open in Claude',
			href: `https://claude.ai/new?${new URLSearchParams({ q: shareQuery })}`,
			icon: AnthropicLogo
		},
		{
			title: 'Open in T3 Chat',
			href: `https://t3.chat/new?${new URLSearchParams({ q: shareQuery })}`,
			icon: MessageCircleIcon
		},
		{
			title: 'Open in Finalchat',
			href: `https://finalchat.app/chat?${new URLSearchParams({ q: shareQuery })}`,
			icon: FinalchatLogo
		}
	]);

	const clipboard = new UseClipboard({ delay: 1000 });
</script>

<div class="flex items-center gap-0">
	<button
		type="button"
		class={cn(
			buttonVariants({ variant: 'secondary', size: 'sm' }),
			'flex items-center gap-2 rounded-r-none md:text-[0.8rem]'
		)}
		onclick={() => clipboard.copy(markdownViewHref)}
	>
		{#if clipboard.copied}
			<div in:scale={{ duration: 500, start: 0.85 }}>
				<CheckIcon tabindex={-1} />
			</div>
		{:else}
			<div in:scale={{ duration: 500, start: 0.85 }}>
				<LinkIcon tabindex={-1} />
			</div>
		{/if}
		Copy Link
	</button>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger
			class={cn(
				buttonVariants({ variant: 'secondary', size: 'icon-sm' }),
				'rounded-l-none border-l-0'
			)}
		>
			<ChevronDownIcon class="size-4" />
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end" class="min-w-[12rem]">
			<DropdownMenu.Item>
				{#snippet child({ props })}
					<a {...props} href={markdownViewHref} target="_blank" rel="noopener noreferrer">
						<MarkdownLogo class="text-muted-foreground size-4 shrink-0" />
						View as Markdown
					</a>
				{/snippet}
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			{#each chatItems as item (item.title)}
				<DropdownMenu.Item>
					{#snippet child({ props })}
						<a {...props} href={item.href} target="_blank" rel="noopener noreferrer">
							<item.icon class="text-muted-foreground size-4 shrink-0" />
							{item.title}
						</a>
					{/snippet}
				</DropdownMenu.Item>
			{/each}
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				{#snippet child({ props })}
					<a {...props} href={source} target="_blank" rel="noopener noreferrer">
						<GithubLogo class="text-muted-foreground size-4 shrink-0" />
						Open in GitHub
					</a>
				{/snippet}
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
