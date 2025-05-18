<script lang="ts">
	import { XIcon } from '@lucide/svelte';

	type Props = {
		value: string;
		disabled: boolean;
		active: boolean;
		onDelete: (value: string) => void;
	};

	let { value, disabled, onDelete, active }: Props = $props();
</script>

<div
	class="flex place-items-center gap-2 rounded-md bg-secondary px-2 py-1 ring-offset-background transition-all hover:cursor-default hover:bg-secondary/90 aria-selected:bg-secondary/90 aria-selected:ring-2 aria-selected:ring-ring aria-selected:ring-offset-2"
	aria-selected={active}
>
	<span>
		{value}
	</span>
	<button type="button" {disabled} onclick={() => onDelete(value)}>
		<XIcon class="size-4" />
	</button>
</div>
