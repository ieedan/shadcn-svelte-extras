<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
	import * as Tabs from '$lib/components/ui/tabs';
	import { cn } from '$lib/utils';
	import { useDemoPreview } from './demo.svelte.js';
	import type { Snippet } from 'svelte';
	import { box } from 'svelte-toolbelt';

	type Props = (
		| {
				type: 'iframe';
				demo: string;
				children?: undefined;
		  }
		| {
				type: 'component';
				children: Snippet;
				demo?: string;
		  }
	) & {
		class?: string;
	};

	let { type, demo, class: className, children }: Props = $props();

	let resizableRef = $state<Resizable.Pane | null>(null);

	const previewState = useDemoPreview({
		type: box.with(() => type),
		demo: box.with(() => demo),
		resizableRef: box.with(() => resizableRef)
	});
</script>

<Tabs.Content
	value="preview"
	data-slot="demo-preview"
	class={cn('border-border bg-background relative aspect-video rounded-md border', {
		'bg-accent dark:bg-card border-none [--pattern-fg:oklch(0_0_0/0.05)] before:pointer-events-none before:absolute before:inset-px before:rounded-[calc(0.625rem-1px)] before:bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] dark:[--pattern-fg:oklch(1_0_0/0.05)]':
			type === 'iframe',
		className
	})}
>
	{#if children}
		{#key previewState.root.previewKey}
			{@render children?.()}
		{/key}
	{:else}
		<Resizable.PaneGroup direction="horizontal">
			<Resizable.Pane
				bind:this={resizableRef}
				defaultSize={100}
				minSize={30}
				onResize={previewState.onResize}
				class="border-border bg-background relative rounded-md border"
			>
				{#key previewState.root.previewKey}
					<iframe
						title="Preview {demo}"
						src={`/demos/${demo}`}
						loading="lazy"
						class="relative z-20 h-full w-full"
					></iframe>
				{/key}
			</Resizable.Pane>
			<Resizable.Handle
				withHandle
				class="z-30 bg-transparent [&_div]:absolute [&_div]:top-1/2 [&_div]:right-2 [&_div]:h-12 [&_div]:w-2 [&_div]:-translate-y-1/2 [&_div]:rounded-full [&_div]:border-none [&_div_svg]:hidden"
			/>
			<Resizable.Pane defaultSize={0}></Resizable.Pane>
		</Resizable.PaneGroup>
	{/if}
</Tabs.Content>
