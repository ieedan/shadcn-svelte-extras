<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { ComponentProps } from 'svelte';

	let { align = 'end', children, ...rest }: ComponentProps<typeof DropdownMenu.Content> = $props();
</script>

<DropdownMenu.Content {align} class="w-fit" {...rest}>
	{@render children?.()}
</DropdownMenu.Content>
