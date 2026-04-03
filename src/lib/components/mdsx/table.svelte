<script lang="ts">
	import { cn } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLTableElement> = $props();
</script>

<div class="no-scrollbar my-6 w-full overflow-y-auto">
	<table class={cn('w-full', className)} {...restProps}>
		{@render children?.()}
	</table>
</div>
