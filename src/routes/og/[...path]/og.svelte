<svelte:options css="injected" />

<script lang="ts">
	type Props = {
		title: string;
		description: string;
	};

	let { title, description }: Props = $props();
</script>

<div class="h-full w-full bg-black text-white">
	{title} - {description}
    <div class="w-full h-px bg-zinc-700 ">

    </div>
</div>
