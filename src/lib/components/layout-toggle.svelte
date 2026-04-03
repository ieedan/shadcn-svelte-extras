<script lang="ts">
	import Button from "$lib/components/button.svelte";
	import { UserConfigContext } from "$lib/user-config.svelte.js";
	import type { ComponentProps } from "svelte";
	import GalleryHorizontalIcon from "@lucide/svelte/icons/gallery-horizontal";

	let { ...restProps }: ComponentProps<typeof Button> = $props();
	const userConfig = UserConfigContext.get();
</script>

<Button
	variant="ghost"
	size="icon"
	onclick={() => {
		userConfig.setConfig({ layout: userConfig.current.layout === "full" ? "fixed" : "full" });
	}}
	{...restProps}
	title="Toggle layout"
>
	<span class="sr-only"> Toggle layout </span>
	<GalleryHorizontalIcon />
</Button>
