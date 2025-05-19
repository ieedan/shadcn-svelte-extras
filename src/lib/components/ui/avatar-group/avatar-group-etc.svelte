<script lang="ts">
	import { cn } from '$lib/utils/utils';

	type Props = {
		class?: string;
		plus: number;
	};

	let { plus, class: className }: Props = $props();
</script>

<div
	class={cn(
		'bg-accent ring-background relative flex size-8 items-center justify-center rounded-full text-xs ring-2',
		className
	)}
>
	<span>+{plus}</span>
</div>
