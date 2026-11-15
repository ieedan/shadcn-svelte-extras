<script lang="ts" module>
	import { cn } from '$lib/utils.js';
	import { tv, type VariantProps } from 'tailwind-variants';
	import { CopyButton } from '../copy-button';
	import type { UseClipboard } from '$lib/hooks/use-clipboard.svelte';

	const style = tv({
		base: 'bg-background relative flex w-full max-w-full min-w-0 flex-col overflow-hidden rounded-md border py-2.5 pr-12 pl-3',
		variants: {
			variant: {
				default: 'border-border bg-card',
				secondary: 'border-border bg-accent',
				destructive: 'border-destructive bg-destructive',
				primary: 'border-primary bg-primary text-primary-foreground'
			}
		}
	});

	type Variant = VariantProps<typeof style>['variant'];

	export type SnippetProps = {
		variant?: Variant;
		text: string | string[];
		class?: string;
		onCopy?: (status: UseClipboard['status']) => void;
	};
</script>

<script lang="ts">
	let { text, variant = 'default', onCopy, class: className }: SnippetProps = $props();

	const multiline = $derived(Array.isArray(text));
	const content = $derived(Array.isArray(text) ? text.join('\n') : text);
</script>

<div class={cn(style({ variant, className: className }))}>
	{#if multiline}
		<textarea
			readonly
			rows={Math.max(text.length, 1)}
			class="snippet-field block max-h-full min-h-0 w-full min-w-0 flex-auto resize-none overflow-auto bg-transparent font-mono text-sm leading-5 font-light whitespace-pre text-inherit outline-none"
			value={content}
			wrap="off"
			spellcheck="false"
			autocomplete="off"
		></textarea>
	{:else}
		<input
			readonly
			type="text"
			class="snippet-field block h-5 w-full min-w-0 overflow-x-auto bg-transparent p-0 font-mono text-sm leading-5 font-light whitespace-nowrap text-inherit outline-none"
			value={content}
			spellcheck="false"
			autocomplete="off"
		/>
	{/if}

	<CopyButton
		class="hover:text-opacity-80 absolute inset-y-0 right-2 z-10 my-auto size-7 transition-opacity ease-in-out hover:bg-transparent dark:hover:bg-transparent"
		text={content}
		{onCopy}
	/>
</div>

<style>
	@property --snippet-fade-start {
		syntax: '<length>';
		inherits: false;
		initial-value: 0px;
	}

	@property --snippet-fade-end {
		syntax: '<length>';
		inherits: false;
		initial-value: 0px;
	}

	@supports (animation-timeline: scroll()) {
		.snippet-field {
			--snippet-fade-size: 1.75rem;
			--snippet-fade-reveal: 2rem;
			--snippet-fade-start: 0px;
			--snippet-fade-end: 0px;
			mask-image: linear-gradient(
				to right,
				transparent,
				#000 var(--snippet-fade-start),
				#000 calc(100% - var(--snippet-fade-end)),
				transparent
			);
			animation:
				snippet-fade-start linear both,
				snippet-fade-end linear both;
			animation-timeline: scroll(self inline), scroll(self inline);
			animation-range:
				0px var(--snippet-fade-reveal),
				calc(100% - var(--snippet-fade-reveal)) 100%;
		}
	}

	@keyframes snippet-fade-start {
		from {
			--snippet-fade-start: 0px;
		}
		to {
			--snippet-fade-start: var(--snippet-fade-size);
		}
	}

	@keyframes snippet-fade-end {
		from {
			--snippet-fade-end: var(--snippet-fade-size);
		}
		to {
			--snippet-fade-end: 0px;
		}
	}
</style>
