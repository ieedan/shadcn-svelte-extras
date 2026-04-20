<script lang="ts" module>
	import type { ButtonGroupOrientation } from '$lib/components/ui/button-group';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WithChildren, WithoutChildren } from 'bits-ui';
	import type { SplitButtonClickEvent } from './split-button.svelte.js';

	export type SplitButtonPropsWithoutHTML = WithChildren<{
		ref?: HTMLDivElement | null;
		orientation?: ButtonGroupOrientation;
		value?: string;
		onclick?: (event: SplitButtonClickEvent) => void;
		onActionSelect?: (value: string) => void;
	}>;

	export type SplitButtonProps = SplitButtonPropsWithoutHTML &
		WithoutChildren<Omit<HTMLAttributes<HTMLDivElement>, 'onclick'>>;
</script>

<script lang="ts">
	import ButtonGroup from '$lib/components/ui/button-group/button-group.svelte';
	import { useSplitButtonRoot } from './split-button.svelte.js';
	import { box } from 'svelte-toolbelt';

	let {
		ref = $bindable(null),
		class: className,
		orientation = 'horizontal',
		value = $bindable(undefined),
		onclick,
		onActionSelect,
		children,
		...rest
	}: SplitButtonProps = $props();

	useSplitButtonRoot({
		value: box.with(
			() => value,
			(v) => (value = v)
		),
		onclick: box.with(() => onclick),
		onActionSelect: box.with(() => onActionSelect)
	});
</script>

<ButtonGroup bind:ref class={className} {orientation} {...rest}>
	{@render children?.()}
</ButtonGroup>
