<script lang="ts">
	import { mode } from 'mode-watcher';
	import type { Props as IconProps } from './icons';
	import { cn } from '$lib/utils/utils';

	let { class: className, ...rest }: IconProps = $props();
</script>

{#if mode.current === 'dark'}
	<svg
		{...rest}
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class={cn('size-4', className)}
	>
		<rect
			x="3"
			y="11.4853"
			width="12"
			height="1.5"
			rx="0.75"
			transform="rotate(-45 3 11.4853)"
			fill="#C2410C"
		/>
		<rect
			x="7"
			y="12.6569"
			width="8"
			height="1.5"
			rx="0.75"
			transform="rotate(-45 7 12.6569)"
			fill="#C2410C"
		/>
		<rect
			x="10.25"
			y="14"
			width="6"
			height="1.5"
			rx="0.75"
			transform="rotate(-90 10.25 14)"
			fill="white"
		/>
		<rect x="8" y="10.25" width="6" height="1.5" rx="0.75" fill="white" />
	</svg>
{:else}
	<svg
		{...rest}
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class={cn('size-4', className)}
	>
		<rect
			x="3"
			y="11.4853"
			width="12"
			height="1.5"
			rx="0.75"
			transform="rotate(-45 3 11.4853)"
			fill="#C2410C"
		/>
		<rect
			x="7"
			y="12.6569"
			width="8"
			height="1.5"
			rx="0.75"
			transform="rotate(-45 7 12.6569)"
			fill="#C2410C"
		/>
		<rect
			x="10.25"
			y="14"
			width="6"
			height="1.5"
			rx="0.75"
			transform="rotate(-90 10.25 14)"
			fill="black"
		/>
		<rect x="8" y="10.25" width="6" height="1.5" rx="0.75" fill="black" />
	</svg>
{/if}
