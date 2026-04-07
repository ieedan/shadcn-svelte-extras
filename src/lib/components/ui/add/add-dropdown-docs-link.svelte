<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { ComponentProps } from 'svelte';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import { cn } from '$lib/utils';
	import { useAddDropdownDocsLink } from './add.svelte.js';
	import { mergeProps } from 'bits-ui';

	let {
		class: className,
		...rest
	}: Omit<ComponentProps<typeof DropdownMenu.Item>, 'onSelect'> = $props();

	const docs = useAddDropdownDocsLink();
	const merged = $derived(mergeProps(rest, docs.props));
</script>

<DropdownMenu.Item class={cn('', className)} {...merged}>
	<ExternalLink class="size-4" />
	<span class="text-sm">View CLI docs</span>
</DropdownMenu.Item>
