<script lang="ts">
	import type { Snippet } from 'svelte';
	import * as Tabs from '$lib/components/ui/tabs';
	import { Code } from '$lib/components/ui/code';
	import { cn } from '$lib/utils/utils';
	import { Button } from './ui/button';
	import { RefreshCwIcon } from '@lucide/svelte';

	type Props = {
		code: string;
		replay?: boolean;
		class?: string;
		children: Snippet<[]>;
	};

	let { children, code, class: className = undefined, replay = false }: Props = $props();

	let remountCount = $state(0);

	let tab: 'preview' | 'code' = $state('preview');
</script>

<div
	class={cn(
		'border-border relative flex min-h-[400px] place-items-center justify-center rounded-lg border',
		className
	)}
>
	<Tabs.Root bind:value={tab} class="size-full">
		<Tabs.List class="absolute top-3 right-3 z-10">
			<Tabs.Trigger value="preview">Preview</Tabs.Trigger>
			<Tabs.Trigger value="code">Code</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="preview" class="size-full">
			{#if replay}
				<Button
					size="icon"
					variant="ghost"
					class="absolute top-3 left-3"
					onclick={() => remountCount++}
				>
					<RefreshCwIcon class="size-4" />
				</Button>
			{/if}
			{#key remountCount}
				<div class="flex size-full place-items-center justify-center">
					{@render children()}
				</div>
			{/key}
		</Tabs.Content>
		<Tabs.Content value="code" class="size-full pb-4">
			<Code lang="svelte" {code} class="size-full border-none bg-transparent" hideLines hideCopy />
		</Tabs.Content>
	</Tabs.Root>
</div>
