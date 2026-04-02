<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLTableRowElement> = $props();
</script>

<tr class={cn("m-0 border-t border-border p-0 even:bg-muted", className)} {...restProps}>
	{@render children?.()}
</tr>
