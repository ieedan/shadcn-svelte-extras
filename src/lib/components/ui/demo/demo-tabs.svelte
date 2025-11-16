<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { cn } from '$lib/utils';
	import { Tabs as TabsPrimitive } from 'bits-ui';

	let { ref = $bindable(null), class: className, ...rest }: TabsPrimitive.ListProps = $props();
</script>

<Tabs.List
	data-slot="demo-tabs"
	bind:ref
	class={cn('border-border bg-background h-9 rounded-md border', className)}
	{...rest}
>
	<Tabs.Trigger
		value="preview"
		class="bg-background data-[state=active]:bg-accent! rounded-sm border-none"
	>
		Preview
	</Tabs.Trigger>
	<Tabs.Trigger
		value="code"
		class="bg-background data-[state=active]:bg-accent! rounded-sm border-none"
	>
		Code
	</Tabs.Trigger>
</Tabs.List>
