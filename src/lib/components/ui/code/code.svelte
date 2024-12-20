<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import Copy from './copy.svelte';
	import { type BundledLanguage } from 'shiki';
	import { shikiContext } from '.';
	import { tv, type VariantProps } from 'tailwind-variants';

	const style = tv({
		base: 'not-prose relative max-h-full rounded-lg border bg-accent py-4',
		variants: {
			variant: {
				default: 'border-border bg-transparent',
				secondary: 'border-transparent bg-secondary/50'
			}
		}
	});

	type Variant = VariantProps<typeof style>['variant'];

	type Props = {
		variant?: Variant;
		lang?: BundledLanguage;
		code: string;
		class?: string;
		copyButtonContainerClass?: string;
		hideLines?: boolean;
		hideCopy?: boolean;
		highlightLines?: (number | [number, number])[];
	};

	const within = (num: number, range: Props['highlightLines']) => {
		if (!range) return false;

		let within = false;

		for (const r of range) {
			if (typeof r === 'number') {
				if (num === r) {
					within = true;
					break;
				}
				continue;
			}

			if (r[0] <= num && num <= r[1]) {
				within = true;
				break;
			}
		}

		return within;
	};

	let {
		variant = 'default',
		lang = 'typescript',
		code,
		copyButtonContainerClass = undefined,
		class: className = undefined,
		hideLines = false,
		hideCopy = false,
		highlightLines = []
	}: Props = $props();

	const highlighter = shikiContext.get();

	const highlighted = $derived(
		$highlighter?.codeToHtml(code, {
			lang: lang,
			themes: {
				light: 'github-light-default',
				dark: 'github-dark-default'
			},
			transformers: [
				{
					pre: (el) => {
						el.properties.style = '';

						return el;
					},
					line: (node, line) => {
						if (within(line, highlightLines)) {
							node.properties.class = node.properties.class + ' line--highlighted';
						}

						return node;
					}
				}
			]
		}) ?? code
	);
</script>

<div class={cn(style({ variant }), className)}>
	<div class:line-numbers={!hideLines} class="text-sm">
		{@html highlighted}
	</div>
	{#if !hideCopy}
		<div
			class={cn(
				'absolute right-2 top-2 flex place-items-center justify-center',
				copyButtonContainerClass
			)}
		>
			<Copy {code} />
		</div>
	{/if}
</div>

<style lang="postcss">
	:global(.line-numbers pre) {
		counter-reset: step;
		counter-increment: step 0;
	}

	:global(pre.shiki) {
		@apply no-scrollbar bg-inherit;
		overflow-y: auto;
		overflow-x: auto;
		max-height: 100%;
	}

	:global(pre.shiki code) {
		@apply grid min-w-full break-words rounded-none border-0 bg-transparent p-0;
		counter-reset: line;
		box-decoration-break: clone;
	}

	:global(.line-numbers pre .line::before) {
		content: counter(step);
		counter-increment: step;
		display: inline-block;
		width: 1.8rem;
		margin-right: 1.4rem;
		text-align: right;
	}

	:global(.line-numbers pre .line::before) {
		@apply text-muted-foreground;
	}

	:global(pre .line.line--highlighted) {
		@apply bg-secondary;
	}

	:global(pre .line.line--highlighted span) {
		@apply relative;
	}

	:global(pre .line) {
		@apply inline-block min-h-[1rem] w-full px-4 py-0.5;
	}

	:global(.line-numbers pre .line) {
		@apply px-2;
	}
</style>
