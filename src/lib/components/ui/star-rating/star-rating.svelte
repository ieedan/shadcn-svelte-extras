<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import { RadioGroup, type RadioGroupRootProps } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { useStarRating } from './star-rating.svelte.js';
	import { box } from 'svelte-toolbelt';

	type Props = Omit<RadioGroupRootProps, 'value' | 'children'> & {
		value?: number;
		stars?: number;
		readonly?: boolean;
		children: Snippet<[{ stars: number[] }]>;
	};

	let {
		value = $bindable(0),
		stars = 5,
		disabled = false,
		readonly = false,
		class: className,
		children,
		...rest
	}: Props = $props();

	useStarRating({
		disabled: box.with(() => disabled),
		readonly: box.with(() => readonly),
		value: box.with(
			() => value,
			(v) => (value = v)
		),
		stars: box.with(() => stars)
	});
</script>

<RadioGroup.Root
	class={cn('group flex w-fit place-items-center gap-1 rounded-md outline-hidden', className)}
	bind:value={() => value.toString(), (v) => (value = parseInt(v))}
	aria-readonly={readonly}
	aria-disabled={disabled}
	orientation="horizontal"
	loop={false}
	disabled={disabled || readonly}
	{...rest}
>
	{@render children({ stars: new Array(stars).fill(0).map((_, i) => i + 1) })}
</RadioGroup.Root>
