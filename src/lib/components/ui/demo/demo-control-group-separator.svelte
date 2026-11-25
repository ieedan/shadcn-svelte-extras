<script lang="ts">
	import { cn } from '#lib/utils.js';
	import type { ComponentProps } from 'svelte';
	import * as Separator from '#lib/components/ui/separator/index.ts';

	let { class: className, ...rest }: ComponentProps<typeof Separator.Root> = $props();
</script>

<Separator.Root
	orientation="vertical"
	class={cn('data-[orientation=vertical]:h-4', className)}
	{...rest}
/>
