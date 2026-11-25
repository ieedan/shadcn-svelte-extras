<script lang="ts">
	import { cn } from '#lib/utils.ts';
	import type { HTMLImgAttributes } from 'svelte/elements';

	let { class: className, src, alt, ...restProps }: HTMLImgAttributes = $props();
</script>

<img {src} {alt} class={cn('rounded-md', className)} {...restProps} />
