<script lang="ts">
	import { box, type WithChildren } from 'svelte-toolbelt';
	import type { FilterFactory, FilterList } from './types.js';
	import { FilterProviderState } from './filters.svelte.js';

	type Props = {
		filters?: FilterList;
		factories: FilterFactory[];
	};

	let { filters = $bindable([]), factories, children }: WithChildren<Props> = $props();

	FilterProviderState.create({
		filters: box.with(
			() => filters,
			(value) => (filters = value)
		),
		factories: box.with(() => factories)
	});
</script>

{@render children?.()}
