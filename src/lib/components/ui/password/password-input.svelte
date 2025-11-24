<script lang="ts">
	import { cn } from '$lib/utils.js';
	import { box, mergeProps } from 'svelte-toolbelt';
	import { usePasswordInput } from './password.svelte.js';
	import type { PasswordInputProps } from './types.js';
	import { Input } from '$lib/components/ui/input';

	let {
		ref = $bindable(null),
		value = $bindable(''),
		class: className,
		children,
		...rest
	}: PasswordInputProps = $props();

	const state = usePasswordInput({
		value: box.with(
			() => value,
			(v) => (value = v)
		),
		ref: box.with(() => ref)
	});

	const mergedProps = $derived(mergeProps(rest, state.props));
</script>

<div class="relative">
	<Input
		{...mergedProps}
		bind:value
		bind:ref
		type={state.root.opts.hidden.current ? 'password' : 'text'}
		class={cn(
			'transition-all',
			{
				// either or is mounted (offset 36px)
				'pr-9': state.root.passwordState.copyMounted || state.root.passwordState.toggleMounted,
				// both are mounted (offset 36px * 2)
				'pr-[4.5rem]':
					state.root.passwordState.copyMounted && state.root.passwordState.toggleMounted
			},
			className
		)}
	/>
	{@render children?.()}
</div>
