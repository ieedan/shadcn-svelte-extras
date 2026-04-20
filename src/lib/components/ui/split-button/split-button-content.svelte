<script lang="ts">
	import { SelectContent } from '$lib/components/ui/select';
	import type { ComponentProps } from 'svelte';

	let { align = 'end', children, ...restProps }: ComponentProps<typeof SelectContent> = $props();
</script>

<SelectContent data-slot="split-button-content" {align} class="p-2" {...restProps}>
	{@render children?.()}
</SelectContent>
