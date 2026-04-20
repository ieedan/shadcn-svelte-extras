<script lang="ts" module>
	import type { ButtonGroupOrientation } from '$lib/components/ui/button-group';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { WithChildren, WithoutChildren } from 'bits-ui';

	export type SplitButtonPropsWithoutHTML = WithChildren<{
		ref?: HTMLDivElement | null;
		orientation?: ButtonGroupOrientation;
	}>;

	export type SplitButtonProps = SplitButtonPropsWithoutHTML &
		WithoutChildren<HTMLAttributes<HTMLDivElement>>;
</script>

<script lang="ts">
	import ButtonGroup from '$lib/components/ui/button-group/button-group.svelte';

	let {
		ref = $bindable(null),
		class: className,
		orientation = 'horizontal',
		children,
		...rest
	}: SplitButtonProps = $props();
</script>

<ButtonGroup bind:ref class={className} {orientation} {...rest}>
	{@render children?.()}
</ButtonGroup>
