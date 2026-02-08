<script lang="ts">
	type Props = {
		id: string;
		value: string;
		active: boolean;
		onSelect: (value: string) => void;
	};

	let { id, value, active, onSelect }: Props = $props();
</script>

<button
	{id}
	type="button"
	role="option"
	aria-selected={active}
	class="bg-secondary aria-selected:ring-ring hover:bg-secondary/80 cursor-default rounded-md px-2 py-0.5 text-sm outline-hidden transition-colors select-none aria-selected:ring-2"
	onmousedown={(e) => {
		e.preventDefault();
		onSelect(value);
	}}
>
	{value}
</button>
