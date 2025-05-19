<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: DropdownMenuPrimitive.SubContentProps = $props();
</script>

<DropdownMenuPrimitive.SubContent
	bind:ref
	class={cn(
		'z-50 min-w-32 rounded-md border bg-popover p-1 text-popover-foreground shadow-lg focus:outline-hidden',
		className
	)}
	{...restProps}
/>
