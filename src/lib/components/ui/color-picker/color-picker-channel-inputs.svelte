<script lang="ts" module>
	import type { ColorChannel } from './color.js';

	export type ColorPickerChannelInputsProps = {
		/** Classes for each input. */
		class?: string;
		/** Accessible label for each channel input. Override it to translate. */
		getLabel?: (channel: ColorChannel) => string;
	};

	const defaultGetLabel = (channel: ColorChannel) =>
		channel.charAt(0).toUpperCase() + channel.slice(1);
</script>

<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { CHANNELS } from './color.js';
	import { useColorPickerRootCtx } from './color-picker.svelte.js';
	import ColorPickerInput from './color-picker-input.svelte';
	import ColorPickerChannelInput from './color-picker-channel-input.svelte';

	let { class: className, getLabel = defaultGetLabel }: ColorPickerChannelInputsProps = $props();

	const root = useColorPickerRootCtx();
</script>

<!-- no wrapper, so the inputs join up as direct children of a ButtonGroup -->
{#if root.format === 'hex'}
	<!-- in a grid, hex takes the width of the three channel inputs it replaces -->
	<ColorPickerInput class={cn('col-span-3', className)} />
{:else}
	{@const format = root.format}
	{#each CHANNELS[format] as channel, index (`${format}-${channel.name}`)}
		<ColorPickerChannelInput
			{format}
			{index}
			aria-label={getLabel(channel.name)}
			class={className}
		/>
	{/each}
{/if}
