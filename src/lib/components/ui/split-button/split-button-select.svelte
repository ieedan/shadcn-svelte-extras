<script lang="ts" module>
	import type { WithoutChild } from '$lib/utils.js';

	export type SplitButtonSelectProps = Omit<
		WithoutChild<SelectPrimitive.RootProps>,
		'type' | 'value' | 'onValueChange'
	>;
</script>

<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import { useSplitButtonRootCtx } from './split-button.svelte.js';

	let { open = $bindable(false), children, ...restProps }: SplitButtonSelectProps = $props();

	const root = useSplitButtonRootCtx();
</script>

<SelectPrimitive.Root
	type="single"
	bind:open
	bind:value={root.action}
	onValueChange={(v) => root.onSelect(v)}
	{...restProps}
>
	{@render children?.()}
</SelectPrimitive.Root>
