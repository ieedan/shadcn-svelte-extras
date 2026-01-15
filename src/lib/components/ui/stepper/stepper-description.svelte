<script lang="ts">
	import { cn } from '$lib/utils';
	import type { HTMLAttributes } from 'svelte/elements';

	let { class: className, children, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div data-slot="stepper-description" class={cn('text-muted-foreground text-center text-sm', className)} {...rest}>
	{@render children?.()}
</div>
