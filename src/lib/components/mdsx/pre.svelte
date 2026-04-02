<script lang="ts">
	import * as Code from '$lib/components/ui/code';
	import { cn } from '$lib/utils.js';
	import type { SupportedLanguage } from '$lib/components/ui/code/shiki';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
		children?: import('svelte').Snippet;
		'data-mdsx-raw'?: string;
		'data-mdsx-lang'?: string;
		'data-mdsx-highlight'?: string;
		'data-language'?: string;
	};

	let {
		class: className,
		children: _children,
		'data-mdsx-raw': dataMdsxRaw,
		'data-mdsx-lang': dataMdsxLang,
		'data-mdsx-highlight': dataMdsxHighlight,
		'data-language': dataLanguage,
		...rest
	}: Props = $props();

	function decodeBase64Url(s: string): string {
		const pad = '='.repeat((4 - (s.length % 4)) % 4);
		const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + pad;
		const bin = atob(b64);
		const bytes = new Uint8Array(bin.length);
		for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
		return new TextDecoder().decode(bytes);
	}

	const code = $derived(dataMdsxRaw ? decodeBase64Url(dataMdsxRaw) : '');
	const highlight = $derived(
		dataMdsxHighlight
			? dataMdsxHighlight
					.split(',')
					.map((n) => Number.parseInt(n, 10))
					.filter((n) => !Number.isNaN(n))
			: []
	);

	const LANG_MAP: Record<string, SupportedLanguage> = {
		bash: 'bash',
		diff: 'diff',
		javascript: 'javascript',
		js: 'javascript',
		json: 'json',
		svelte: 'svelte',
		typescript: 'typescript',
		ts: 'typescript',
	};

	const lang = $derived.by(() => {
		const raw = (dataMdsxLang ?? dataLanguage ?? 'plaintext').toLowerCase();
		return LANG_MAP[raw] ?? 'typescript';
	});
</script>

{#if code}
	<div class={cn('not-prose mt-6 w-full min-w-0', className)} {...rest}>
		<Code.Root {code} {lang} {highlight} class="w-full min-w-0">
			<Code.CopyButton />
		</Code.Root>
	</div>
{/if}
