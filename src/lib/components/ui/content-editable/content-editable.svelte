<script lang="ts" generics="Tag extends keyof HTMLElementTagNameMap">
	import { useContentEditable } from './content-editable.svelte.js';
	import { box, mergeProps } from 'svelte-toolbelt';
	import { cn, noop } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAttributes<HTMLElementTagNameMap[Tag]>, 'contenteditable'> & {
		ref?: HTMLElementTagNameMap[Tag] | null;
		this: Tag;
		editing?: boolean;
		value?: string;
		onValueCommit?: (value: string) => void;
		onValueChange?: (value: string) => void;
		onEditingChange?: (editing: boolean) => void;
		children: Snippet<[]>;
	};

	const uuid = $props.id();

	let {
		id = uuid,
		ref = $bindable(null),
		this: tag,
		editing = $bindable(false),
		value = $bindable(''),
		onValueCommit = noop,
		onValueChange = noop,
		onEditingChange = noop,
		children,
		class: className,
		...props
	}: Props = $props();

	const state = useContentEditable({
		id: box.with(() => id!),
		ref: box.with(
			() => ref,
			(v) => (ref = v)
		),
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

	const mergedProps = $derived(mergeProps(props, state.props));
</script>

<svelte:element this={tag} class={cn(className)} contenteditable {...mergedProps as any}>
	{@render children?.()}
</svelte:element>
