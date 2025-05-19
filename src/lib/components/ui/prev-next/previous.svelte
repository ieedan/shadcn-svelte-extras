<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ChevronLeftIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils/utils';
	import { Button, type ButtonProps } from '$lib/components/ui/button';

	interface Props extends ButtonProps {
		children: Snippet<[]>;
	}

	let { children, class: className, ...rest }: Props = $props();
</script>

<Button
	class={cn('flex place-items-center gap-2 pr-4 pl-2', className)}
	variant="outline"
	size="sm"
	{...rest}
>
	<ChevronLeftIcon class="size-4" />
	{@render children()}
</Button>
