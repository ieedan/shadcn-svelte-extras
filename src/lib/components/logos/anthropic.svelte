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
	fill="currentColor"
	role="img"
	viewBox="0 0 24 24"
	class={cn('size-4 shrink-0', className)}
	aria-hidden="true"
	{...rest}
>
	<path
		d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"
	/>
</svg>
