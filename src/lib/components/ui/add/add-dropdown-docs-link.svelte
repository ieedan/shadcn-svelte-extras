<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { ComponentProps } from 'svelte';
	import ExternalLink from '@lucide/svelte/icons/external-link';
	import { cn } from '$lib/utils';

	let {
		class: className,
		...rest
	}: Omit<ComponentProps<typeof DropdownMenu.Item>, 'onSelect'> = $props();
</script>

<DropdownMenu.Item
	class={cn('', className)}
	onSelect={() => window.open('https://jsrepo.dev/docs/cli/add', '_blank')}
	{...rest}
>
	<ExternalLink class="size-4" />
	<span class="text-sm">View CLI Documentation</span>
</DropdownMenu.Item>
