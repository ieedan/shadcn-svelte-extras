<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, children, ...restProps }: HTMLAttributes<HTMLHeadingElement> = $props();
</script>

<h1
	class={cn("scroll-m-20 text-4xl font-extrabold tracking-tight text-balance", className)}
	{...restProps}
>
	{@render children?.()}
</h1>
