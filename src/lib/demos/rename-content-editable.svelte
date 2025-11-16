<script lang="ts">
	import * as Rename from '$lib/components/ui/rename';

	let value = $state('feat: add rename component');
</script>

<div class="flex flex-col gap-2">
	<Rename.Root this="span" bind:value validate={(value) => value.length > 0} class="text-xl" />

	<p>Value: <span class="font-bold">{value}</span></p>
</div>

