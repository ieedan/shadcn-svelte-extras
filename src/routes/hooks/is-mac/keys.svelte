<script lang="ts">
	import { cmdOrCtrl, optionOrAlt } from '$lib/hooks/is-mac.svelte';
	import { Kbd } from '$lib/components/ui/kbd';
</script>

<div class="flex flex-col place-items-center gap-2">
	<div class="flex flex-col place-items-center gap-2">
		<span class="text-muted-foreground text-sm">Command/Ctrl</span>
		<Kbd variant="secondary">
			{cmdOrCtrl}
		</Kbd>
	</div>
	<div class="flex flex-col place-items-center gap-2">
		<span class="text-muted-foreground text-sm">Option/Alt</span>
		<Kbd variant="secondary">
			{optionOrAlt}
		</Kbd>
	</div>
</div>
