<script lang="ts">
	import { Toggle } from '$lib/components/ui/toggle';
	import EyeIcon from '@lucide/svelte/icons/eye';
	import EyeOffIcon from '@lucide/svelte/icons/eye-off';
	import { usePasswordToggleVisibility } from './password.svelte.js';
	import type { PasswordToggleVisibilityProps } from './types.js';
	import { cn } from '$lib/utils.js';

	let { ref = $bindable(null), class: className }: PasswordToggleVisibilityProps = $props();

	const state = usePasswordToggleVisibility();
</script>

<Toggle
	bind:ref
	aria-label={state.root.opts.hidden.current ? 'Show password' : 'Hide password'}
	bind:pressed={state.root.opts.hidden.current}
	class={cn(
		'data-[state=off]:text-muted-foreground data-[state=on]:text-muted-foreground hover:data-[state=off]:text-accent-foreground hover:data-[state=on]:text-accent-foreground absolute top-1/2 right-0 size-9 min-w-0 -translate-y-1/2 p-0 hover:!bg-transparent data-[state=on]:bg-transparent',
		{
			'right-9 max-w-6': state.root.passwordState.copyMounted
		},
		className
	)}
	tabindex={-1}
>
	{#if state.root.opts.hidden.current}
		<EyeIcon class="size-4" />
	{:else}
		<EyeOffIcon class="size-4" />
	{/if}
</Toggle>
