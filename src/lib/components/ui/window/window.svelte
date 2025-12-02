<script lang="ts" module>
	import type { WithChildren } from 'bits-ui';
	import type { HTMLAttributes } from 'svelte/elements';

	export type WindowPropsWithoutHTML = WithChildren & {
		contentClass?: string;
	};

	export type WindowProps = HTMLAttributes<HTMLDivElement> & WindowPropsWithoutHTML;
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';

	let { children, class: className, contentClass }: WindowProps = $props();
</script>

<div class={cn('border-border bg-background aspect-video w-full rounded-lg border', className)}>
	<div class="border-b border-inherit p-4">
		<div class="flex items-center gap-2">
			<div class="size-2 rounded-full bg-[#ef4444]"></div>
			<div class="size-2 rounded-full bg-[#eab308]"></div>
			<div class="size-2 rounded-full bg-[#22c55e]"></div>
		</div>
	</div>
	<div class={cn('p-4', contentClass)}>
		{@render children?.()}
	</div>
</div>
