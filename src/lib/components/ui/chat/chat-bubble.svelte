<script lang="ts">
	import type { ChatBubbleProps } from './types';

	let { ref = $bindable(null), variant, children, ...rest }: ChatBubbleProps = $props();
</script>

<div
	{...rest}
	bind:this={ref}
	class="group/chat-bubble flex max-w-[80%] flex-row place-items-end gap-2 data-[variant='sent']:place-self-end"
	data-variant={variant}
>
	{@render children?.()}
</div>
