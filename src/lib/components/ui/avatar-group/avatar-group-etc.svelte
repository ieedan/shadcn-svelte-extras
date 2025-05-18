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
		'relative flex size-8 items-center justify-center rounded-full bg-accent text-xs ring-2 ring-background',
		className
	)}
>
	<span>+{plus}</span>
</div>
