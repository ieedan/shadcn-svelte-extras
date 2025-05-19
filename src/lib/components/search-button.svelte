<script lang="ts">
	import { Kbd } from '$lib/components/ui/kbd';
	import { Button } from '$lib/components/ui/button';
	import { SearchIcon, CommandIcon } from '@lucide/svelte';
	import { cn } from '$lib/utils/utils';
	import { commandContext } from '$lib/context';

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
	<Kbd size="sm" variant="secondary">
		<CommandIcon class="inline" />
		+ K
	</Kbd>
</Button>
