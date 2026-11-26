<script lang="ts">
	import { CopyButton } from '#lib/components/ui/copy-button/index.ts';
	import type { PasswordCopyButtonProps } from './types.ts';
	import { cn } from '#lib/utils.ts';
	import { usePasswordCopy } from './password.svelte.ts';

	let { ref = $bindable(null), class: className, ...rest }: PasswordCopyButtonProps = $props();

	const state = usePasswordCopy();
</script>

<CopyButton
	{...rest}
	bind:ref
	text={state.root.passwordState.value}
	tabindex={-1}
	class={cn(
		'text-muted-foreground absolute top-1/2 right-0 size-9 min-w-0 -translate-y-1/2 hover:!bg-transparent',
		className
	)}
/>
