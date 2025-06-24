<script lang="ts">
	import { useContentEditable } from './content-editable.svelte.js';
	import { box } from 'svelte-toolbelt';
	import { noop } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';

	type Props = {
		editing?: boolean;
		value?: string;
		onValueCommit?: (value: string) => void;
		onValueChange?: (value: string) => void;
		onEditingChange?: (editing: boolean) => void;
		children: Snippet<[]>;
	};

	let {
		editing = $bindable(false),
		value = $bindable(''),
		onValueCommit = noop,
		onValueChange = noop,
		onEditingChange = noop,
		children
	}: Props = $props();

	useContentEditable({
		editing: box.with(
			() => editing,
			(v) => (editing = v)
		),
		value: box.with(
			() => value,
			(v) => (value = v)
		),
		onValueCommit: box.with(() => onValueCommit),
		onValueChange: box.with(() => onValueChange),
		onEditingChange: box.with(() => onEditingChange)
	});
</script>

{@render children?.()}
