<script lang="ts">
	import { CopyButton } from '#lib/components/ui/copy-button/index.ts';
	import { cn } from '#lib/utils.ts';
	import { useCodeCopyButton } from './code.svelte.ts';
	import type { CodeCopyButtonProps } from './types.ts';

	let {
		ref = $bindable(null),
		variant = 'ghost',
		size = 'icon',
		class: className,
		...rest
	}: CodeCopyButtonProps = $props();

	const copyButton = useCodeCopyButton();
</script>

<CopyButton
	bind:ref
	class={cn('absolute top-2 right-2', className)}
	text={copyButton.code}
	tabindex={-1}
	{variant}
	{size}
	{...rest}
/>
