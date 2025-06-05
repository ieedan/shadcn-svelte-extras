<script lang="ts">
	import { Button, type ButtonElementProps } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils/utils.js';
	import PanelLeftIcon from '@lucide/svelte/icons/panel-left';
	import { useSidebar } from './context.svelte.js';

	let { ref = $bindable(null), class: className, onclick, ...rest }: ButtonElementProps = $props();

	const sidebar = useSidebar();
</script>

<Button
	type="button"
	data-sidebar="trigger"
	data-slot="sidebar-trigger"
	variant="ghost"
	size="icon"
	class={cn('size-7', className)}
	onclick={(e) => {
		onclick?.(e);
		sidebar.toggle();
	}}
	{...rest}
>
	<PanelLeftIcon />
	<span class="sr-only">Toggle Sidebar</span>
</Button>
