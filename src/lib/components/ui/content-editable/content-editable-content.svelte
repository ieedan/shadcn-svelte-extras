<script lang="ts" generics="Tag extends keyof HTMLElementTagNameMap">
	import { useContentEditableContent } from './content-editable.svelte.js';
	import { box, mergeProps } from 'svelte-toolbelt';
	import { cn } from '$lib/utils/utils';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = Omit<HTMLAttributes<HTMLElementTagNameMap[Tag]>, 'contenteditable'> & {
		ref?: HTMLElementTagNameMap[Tag] | null;
		this: Tag;
		children: Snippet<[]>;
	};

	const uuid = $props.id();

	let {
		id = uuid,
		ref = $bindable(null),
		this: tag,
		children,
		class: className,
		...props
	}: Props = $props();

	const state = useContentEditableContent({
		id: box.with(() => id!),
		ref: box.with(
			() => ref,
			(v) => (ref = v)
		)
	});

	const mergedProps = $derived(mergeProps(props, state.props));
</script>

<svelte:element
	this={tag}
	class={cn(
		'contenteditable:border-b-border border border-transparent focus:outline-none',
		className
	)}
	{...mergedProps as any}
>
	{@render children?.()}
</svelte:element>

<style>
	@import 'tailwindcss';

	@reference '../../../../app.css';

	@custom-variant contenteditable (&:is([contenteditable="true"]));
</style>
