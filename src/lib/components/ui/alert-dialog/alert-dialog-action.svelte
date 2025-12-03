<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
	import { Button, buttonVariants, type ButtonProps } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	let {
		ref = $bindable(null),
		variant = 'default',
		class: className,
		children,
		...restProps
	}: AlertDialogPrimitive.ActionProps & {
		variant?: ButtonProps['variant'];
		loading?: boolean;
	} = $props();
</script>

<AlertDialogPrimitive.Action
	bind:ref
	data-slot="alert-dialog-action"
	class={cn(buttonVariants({ variant }), className)}
	{...restProps}
>
	{#snippet child({ props })}
		<Button {...props}>
			{@render children?.()}
		</Button>
	{/snippet}
</AlertDialogPrimitive.Action>
