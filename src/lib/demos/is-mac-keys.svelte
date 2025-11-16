<script lang="ts">
	import { cmdOrCtrl, optionOrAlt } from '$lib/hooks/is-mac.svelte';
	import { Kbd } from '$lib/components/ui/kbd';
</script>

<div class="flex flex-col place-items-center gap-2">
	<div class="flex flex-col place-items-center gap-2">
		<span class="text-muted-foreground text-sm">Command/Ctrl</span>
		<Kbd>
			{cmdOrCtrl}
		</Kbd>
	</div>
	<div class="flex flex-col place-items-center gap-2">
		<span class="text-muted-foreground text-sm">Option/Alt</span>
		<Kbd>
			{optionOrAlt}
		</Kbd>
	</div>
</div>

