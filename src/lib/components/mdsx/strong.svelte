<script lang="ts">
	import { cn } from '#lib/utils.ts';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<strong class={cn('font-semibold', className)} {...restProps}>
	{@render children?.()}
</strong>
