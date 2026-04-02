<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
	import { buttonVariants, type ButtonVariant, type ButtonSize } from '$lib/components/ui/button';
	import Button from '$lib/components/button.svelte';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'default',
		size = 'default',
		children,
		...restProps
	}: AlertDialogPrimitive.ActionProps & {
		variant?: ButtonVariant;
		size?: ButtonSize;
		loading?: boolean;
	} = $props();
</script>

<AlertDialogPrimitive.Action
	bind:ref
	data-slot="alert-dialog-action"
	class={cn(buttonVariants({ variant, size }), 'cn-alert-dialog-action', className)}
	{...restProps}
>
	{#snippet child({ props })}
		<Button {...props}>
			{@render children?.()}
		</Button>
	{/snippet}
</AlertDialogPrimitive.Action>
