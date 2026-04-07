<script lang="ts">
	import { Menubar as MenubarPrimitive } from 'bits-ui';
	import { cn } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: MenubarPrimitive.TriggerProps = $props();
</script>

<MenubarPrimitive.Trigger
	bind:ref
	data-slot="menubar-trigger"
	class={cn(
		'hover:bg-muted aria-expanded:bg-muted flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-hidden select-none',
		className
	)}
	{...restProps}
/>
