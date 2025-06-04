<script lang="ts">
	import { cn } from '$lib/utils/utils';
	import type { AvatarGroupEtcProps } from './types';

	let { ref = $bindable(null), plus, class: className, ...rest }: AvatarGroupEtcProps = $props();
</script>

<div
	{...rest}
	bind:this={ref}
	class={cn(
		'bg-accent ring-background relative flex size-8 items-center justify-center rounded-full text-xs ring-2',
		className
	)}
>
	<span>+{plus}</span>
</div>
