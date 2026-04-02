<script lang="ts">
	import { AlertDialog as AlertDialogPrimitive } from 'bits-ui';
	import {
		buttonVariants,
		type ButtonVariant,
		type ButtonSize
	} from '$lib/components/ui/button/index.js';
	import Button from '$lib/components/button.svelte';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		variant = 'outline',
		size = 'default',
		children,
		...restProps
	}: AlertDialogPrimitive.CancelProps & {
		variant?: ButtonVariant;
		size?: ButtonSize;
		loading?: boolean;
	} = $props();
</script>

<AlertDialogPrimitive.Cancel
	bind:ref
	data-slot="alert-dialog-cancel"
	class={cn(buttonVariants({ variant, size }), className)}
	{...restProps}
>
	{#snippet child({ props })}
		<Button {...props}>
			{@render children?.()}
		</Button>
	{/snippet}
</AlertDialogPrimitive.Cancel>
