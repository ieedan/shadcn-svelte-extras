<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { cn } from '$lib/utils';
	import { Tabs as TabsPrimitive } from 'bits-ui';

	let { ref = $bindable(null), class: className, ...rest }: TabsPrimitive.ListProps = $props();
</script>

<Tabs.List
	data-slot="demo-tabs"
	bind:ref
	class={cn('h-9 rounded-md border border-border bg-background', className)}
	{...rest}
>
	<Tabs.Trigger
		value="preview"
		class="rounded-sm border-none bg-background data-[state=active]:bg-accent!"
	>
		Preview
	</Tabs.Trigger>
	<Tabs.Trigger
		value="code"
		class="rounded-sm border-none bg-background data-[state=active]:bg-accent!"
	>
		Code
	</Tabs.Trigger>
</Tabs.List>
