<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLLIElement> = $props();
</script>

<li class={cn(className)} {...restProps}>
	{@render children?.()}
</li>
