<script lang="ts">
	import { cn } from '#lib/utils.ts';
	import type { HTMLTdAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLTdAttributes = $props();
</script>

<td
	class={cn(
		'border-border border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
		className
	)}
	{...restProps}
>
	{@render children?.()}
</td>
