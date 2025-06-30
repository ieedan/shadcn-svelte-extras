<script lang="ts">
	import type { Snippet } from 'svelte';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import { cn } from '$lib/utils/utils';
	import { Button, type AnchorElementProps } from '$lib/components/ui/button';

	interface Props extends AnchorElementProps {
		children: Snippet<[]>;
	}

	let { children, class: className, ...rest }: Props = $props();
</script>

<Button
	class={cn('flex place-items-center gap-2 pr-2 pl-4', className)}
	variant="outline"
	size="sm"
	{...rest}
>
	{@render children()}
	<ChevronRightIcon class="size-4" />
</Button>
