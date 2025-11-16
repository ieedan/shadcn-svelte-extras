<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
	import * as Tabs from '$lib/components/ui/tabs';
	import { cn } from '$lib/utils';
	import { useDemoPreview } from './demo.svelte.js';
	import type { Snippet } from 'svelte';
	import { box } from 'svelte-toolbelt';

	type Props =
		| {
				type: 'iframe';
				demo: string;
				children?: undefined;
		  }
		| {
				type: 'component';
				children: Snippet;
				demo?: undefined;
		  };

	let { type, demo, children }: Props = $props();

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
	class={cn('relative aspect-video rounded-md border border-border bg-background', {
		'border-none bg-accent [--pattern-fg:oklch(0_0_0/0.05)] before:pointer-events-none before:absolute before:inset-px before:rounded-[calc(0.625rem-1px)] before:bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] dark:bg-card dark:[--pattern-fg:oklch(1_0_0/0.05)]':
			type === 'iframe'
	})}
>
	{#if children}
		{@render children?.()}
	{:else}
		<Resizable.PaneGroup direction="horizontal">
			<Resizable.Pane
				bind:this={resizableRef}
				defaultSize={100}
				minSize={30}
				onResize={previewState.onResize}
				class="relative rounded-md border border-border bg-background"
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
