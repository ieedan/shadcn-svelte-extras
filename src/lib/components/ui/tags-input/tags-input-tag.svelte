<script lang="ts">
	import XIcon from '@lucide/svelte/icons/x';

	type Props = {
		value: string;
		disabled: boolean | null;
		active: boolean;
		onDelete: (value: string) => void;
	};

	let { value, disabled, onDelete, active }: Props = $props();
</script>

<div
	class="bg-secondary ring-offset-background hover:bg-secondary/90 aria-selected:bg-secondary/90 aria-selected:ring-ring flex place-items-center gap-2 rounded-md px-2 py-0.5 transition-all hover:cursor-default aria-selected:ring-2 aria-selected:ring-offset-2"
	aria-selected={active}
>
	<span>
		{value}
	</span>
	<button type="button" {disabled} onclick={() => onDelete(value)}>
		<XIcon class="size-4" />
	</button>
</div>
