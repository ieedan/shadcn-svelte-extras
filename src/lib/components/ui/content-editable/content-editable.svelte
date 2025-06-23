<script lang="ts" generics="Tag extends keyof HTMLElementTagNameMap">
	import type { HTMLAttributes } from 'svelte/elements';
	import { useContentEditable } from './content-editable.svelte.js';
	import { box, mergeProps } from 'svelte-toolbelt';
	import { noop } from '$lib/utils/utils';

	type Props = HTMLAttributes<HTMLElementTagNameMap[Tag]> & {
		this: Tag;
		editing?: boolean;
		value?: string;
		onValueCommit?: (value: string) => void;
		onValueChange?: (value: string) => void;
		onEditingChange?: (editing: boolean) => void;
	};

	let {
		this: tag,
		editing = $bindable(false),
		value = $bindable(''),
		onValueCommit = noop,
		onValueChange = noop,
		onEditingChange = noop,
		children,
		...props
	}: Props = $props();

	const state = useContentEditable({
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

	const mergedProps = mergeProps(props, state.props);
</script>

<svelte:element this={tag} {...mergedProps as any}>
	{@render children?.()}
</svelte:element>
