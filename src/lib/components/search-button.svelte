<script lang="ts">
	import { Kbd, KbdGroup } from '$lib/components/ui/kbd';
	import { Button } from '$lib/components/ui/button';
	import SearchIcon from '@lucide/svelte/icons/search';
	import { cn } from '$lib/utils.js';
	import { commandContext } from '$lib/context';
	import { cmdOrCtrl } from '$lib/hooks/is-mac.svelte';

	type Props = {
		class?: string;
	};

	let { class: className }: Props = $props();

	const commandState = commandContext.get();
</script>

<Button
	variant="outline"
	class={cn('flex w-full place-items-center justify-between px-2', className)}
	onclick={commandState.setTrue}
>
	<span class="text-muted-foreground flex place-items-center gap-2">
		<SearchIcon class="inline size-4" />
		Search
	</span>
	<KbdGroup>
		<Kbd>
			{cmdOrCtrl}
		</Kbd>
		<span>+</span>
		<Kbd>K</Kbd>
	</KbdGroup>
</Button>
