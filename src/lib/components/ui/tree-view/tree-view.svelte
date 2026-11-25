<script lang="ts">
	import { cn } from '#lib/utils.ts';
	import type { TreeViewRootProps } from './types.ts';

	let { children, class: className }: TreeViewRootProps = $props();
</script>

<div role="tree" class={cn('flex flex-col', className)}>
	{@render children?.()}
</div>
