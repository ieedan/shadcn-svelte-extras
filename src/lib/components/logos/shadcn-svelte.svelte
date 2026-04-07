<script lang="ts">
	import { cn } from '$lib/utils';

	type Props = {
		class?: string;
		width?: number;
		height?: number;
	};

	let { class: className, ...rest }: Props = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 256 256"
	class={cn('size-4 shrink-0', className)}
	aria-hidden="true"
	{...rest}
>
	<rect width="256" height="256" fill="none" />
	<line
		x1="208"
		y1="128"
		x2="128"
		y2="208"
		fill="none"
		stroke="#EB4F27"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="32"
	/>
	<line
		x1="192"
		y1="40"
		x2="40"
		y2="192"
		fill="none"
		stroke="#EB4F27"
		stroke-linecap="round"
		stroke-linejoin="round"
		stroke-width="32"
	/>
</svg>
